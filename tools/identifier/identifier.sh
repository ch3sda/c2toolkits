#!/bin/bash
# identifier.sh "<input_text>" [mode]
INPUT="$1"
MODE="$2"

if [[ -z "$INPUT" ]]; then
    echo "Error -> 0%"
    exit 1
fi

shannon_entropy() {
    local str="$1"
    declare -A freq
    local len=${#str}
    local e=0
    for (( i=0; i<len; i++ )); do
        c="${str:$i:1}"
        freq[$c]=$((freq[$c]+1))
    done
    for f in "${freq[@]}"; do
        e=$(awk "BEGIN{p=$f/$len; e=$e; if(p>0) print e - (p*log(p)/log(2)); else print e}")
    done
    echo "$e"
}

is_printable() {
    local str="$1"
    [[ "$str" =~ ^[[:print:][:space:]]+$ ]]
}

normalize_score() {
    local val=$1
    (( val>100 )) && val=100
    (( val<0 )) && val=0
    echo "$val"
}

# -----------------------
# HASH DETECTION (FIXED OUTPUT)
# -----------------------
if [[ "$MODE" == "hash" ]]; then
    LEN=${#INPUT}
    if [[ "$INPUT" =~ ^[0-9a-fA-F]+$ ]]; then
        ENTROPY=$(shannon_entropy "$INPUT")
        ENT_SCORE=$(awk "BEGIN{printf \"%d\", $ENTROPY*10}")
        # OUTPUT FORMAT (matches frontend filter)
        [[ $LEN -eq 32 ]]  && echo "MD5 / NTLM -> $((50+ENT_SCORE))%"
        [[ $LEN -eq 40 ]]  && echo "SHA-1 -> $((55+ENT_SCORE))%"
        [[ $LEN -eq 64 ]]  && echo "SHA-256 -> $((60+ENT_SCORE))%"
        [[ $LEN -eq 128 ]] && echo "SHA-512 -> $((65+ENT_SCORE))%"
    fi
    exit 0
fi

# -----------------------
# ENCODING / CIPHER DETECTION
# -----------------------
declare -A CANDIDATES
LEN=${#INPUT}
ENT=$(shannon_entropy "$INPUT")
ENT_INT=$(awk "BEGIN{printf \"%d\", $ENT*100}")

# Logic remains exactly as yours...
if [[ "$INPUT" =~ [A-Za-z] ]]; then SCORE=$(awk "BEGIN{printf \"%d\", $ENT*10 + ${#INPUT}/2}"); CANDIDATES["ROT"]=$(normalize_score $SCORE); fi
if [[ "$INPUT" =~ [A-Za-z] ]]; then SCORE=$(awk "BEGIN{printf \"%d\", $ENT*8 + ${#INPUT}/3}"); CANDIDATES["Atbash"]=$(normalize_score $SCORE); fi
if [[ "$INPUT" =~ [A-Za-z] ]]; then SCORE=$(awk "BEGIN{printf \"%d\", $ENT*9 + ${#INPUT}/4}"); CANDIDATES["Vigenère"]=$(normalize_score $SCORE); fi
if [[ "$INPUT" =~ ^[A-Za-z0-9+/]+={0,2}$ ]] && (( LEN % 4 == 0 )); then
    SCORE=$(awk "BEGIN{printf \"%d\", 50 + $ENT*10 + LEN/2}"); DECODED=$(echo "$INPUT" | base64 --decode 2>/dev/null || echo "")
    is_printable "$DECODED" && SCORE=$((SCORE+20)); CANDIDATES["Base64"]=$(normalize_score $SCORE)
fi
if [[ "$INPUT" =~ ^[0-9a-fA-F]+$ ]] && (( LEN % 2 == 0 )); then
    SCORE=$(awk "BEGIN{printf \"%d\", 50 + (100-$ENT_INT)/2 + LEN/3}"); DECODED=$(echo "$INPUT" | xxd -r -p 2>/dev/null || echo "")
    is_printable "$DECODED" && SCORE=$((SCORE+20)); CANDIDATES["Hex"]=$(normalize_score $SCORE)
fi
if [[ "$INPUT" =~ %[0-9A-Fa-f]{2} ]]; then SCORE=$(awk "BEGIN{printf \"%d\", 40 + $ENT_INT/2}"); CANDIDATES["URL_Encode"]=$(normalize_score $SCORE); fi
if [[ "$INPUT" =~ ^([0-9]{2,3}[[:space:]]+)+[0-9]{2,3}$ ]]; then SCORE=$(awk "BEGIN{printf \"%d\", 50 + LEN/2}"); CANDIDATES["ASCII_Codes"]=$(normalize_score $SCORE); fi
if [[ "$INPUT" == *"&lt;"* || "$INPUT" == *"&gt;"* || "$INPUT" == *"&amp;"* || "$INPUT" == *"&quot;"* || "$INPUT" == *"&apos;"* ]]; then
    SCORE=$(awk "BEGIN{printf \"%d\", 40 + LEN/3 + $ENT_INT/4}"); CANDIDATES["HTML_Entities"]=$(normalize_score $SCORE)
fi
if [[ "$INPUT" =~ ^[01\ ]+$ ]]; then SCORE=$(awk "BEGIN{printf \"%d\", 50 + $ENT_INT/2}"); CANDIDATES["Binary"]=$(normalize_score $SCORE); fi
if [[ "$INPUT" =~ ^([0-7]{2,3}[[:space:]]+)+[0-7]{2,3}$ ]]; then SCORE=$(awk "BEGIN{printf \"%d\", 50 + $ENT_INT/3}"); CANDIDATES["Octal"]=$(normalize_score $SCORE); fi
if [[ "$INPUT" =~ ^([0-9]{2,3}[[:space:]]+)+[0-9]{2,3}$ ]]; then SCORE=$(awk "BEGIN{printf \"%d\", 50 + $ENT_INT/3 + LEN/2}"); CANDIDATES["Decimal"]=$(normalize_score $SCORE); fi
if [[ "$INPUT" =~ ^[.\-/\ ]+$ ]]; then SCORE=$(awk "BEGIN{printf \"%d\", 50 + LEN/2 + $ENT_INT/4}"); CANDIDATES["Morse"]=$(normalize_score $SCORE); fi
if [[ "$INPUT" =~ [A-Za-z0-9] ]]; then SCORE=$(awk "BEGIN{printf \"%d\", 30 + $ENT_INT/2 + LEN/5}"); CANDIDATES["XOR_Cipher"]=$(normalize_score $SCORE); fi

sorted=$(for k in "${!CANDIDATES[@]}"; do
    echo "$k ${CANDIDATES[$k]}"
done | sort -k2 -nr | head -n 5)

while read -r line; do
    key=$(awk '{print $1}' <<< "$line")
    val=$(awk '{print $2}' <<< "$line")
    if [[ "$val" =~ ^[0-9]+$ ]]; then
        echo "$key -> $val%"
    else
        echo "$key -> $val"
    fi
done <<< "$sorted"