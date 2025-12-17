#!/usr/bin/env bash
# Enhanced Features: ROT13, ROT-n, Caesar brute, Atbash, Vigenere, base64, hex, URL, ASCII
# NEW: HTML entities, Binary, Octal, Decimal, Morse Code, XOR
# Session-only history (no files). Small deps: tr, awk, sed, base64, xxd/hexdump
# Author: ch3sda — 2025
# Education only
# -----------------------

RESET="\e[0m"
BOLD="\e[1m"
DIM="\e[2m"
NEON_PINK="\e[95m"
NEON_CYAN="\e[96m"
NEON_GREEN="\e[92m"
NEON_YELLOW="\e[93m"
NEON_BLUE="\e[94m"
HEART="❤"

credit(){
  clear
  echo -e "${NEON_PINK}${BOLD}"
  echo "╔═════════════════════════════════╗"
  echo "║        CryptME v2.0 ${HEART}           ║"
  echo "║           by ch3sda             ║"
  echo "╚═════════════════════════════════╝"
  echo -e "${RESET}"
  sleep 1.5
}

warning_notice(){
  clear
  echo -e "${NEON_PINK}${BOLD}⚠ WARNING — READ CAREFULLY ⚠${RESET}"
  echo -e "${NEON_CYAN}"
  echo "This tool encrypts/decrypts text only."
  echo "Do NOT use for illegal hacking activities."
  echo ""
  echo "Allowed usage:"
  echo "  ✓ Learning"
  echo "  ✓ Cybersecurity study"
  echo "  ✓ CTF"
  echo "  ✓ Your OWN material"
  echo ""
  echo "NOT allowed:"
  echo "  ✗ Cracking private messages"
  echo "  ✗ Unauthorized surveillance"
  echo ""
  echo "You take full responsibility."
  echo ""
  read -p "Press ENTER if you agree..."
}

# RUN safety screens first
credit
warning_notice

# small helper for printing cute separators
sep(){ echo -e "${NEON_CYAN}────────────────────────────────────────────────${RESET}"; }

# session history (array)
HISTORY=()

push_hist(){ HISTORY+=("$1"); }

# check for optional commands
has_cmd(){ command -v "$1" >/dev/null 2>&1; }

# banner (figlet optional)
banner(){
  clear
  if has_cmd figlet; then
    echo -e "${NEON_PINK}"
    figlet -f small "CryptME v2"
    echo -e "${RESET}"
  else
    echo -e "${NEON_PINK}${BOLD}<<< CryptME v2.0 ${HEART} >>>${RESET}"
  fi
  echo -e "${NEON_CYAN}CryptME ✦ friendly CLI — Bash shell${RESET}"
  echo -e "${NEON_CYAN}Check out https://github.com/ch3sda for more tools${RESET}"
  sep
}

# read input safely (preserve spaces)
read_input(){
  local prompt="$1"
  local var
  read -r -p "$prompt" var
  echo "$var"
}

# -----------------------
# Basic transformations (ORIGINAL)
# -----------------------

rot_n(){
  local shift=$1
  local text="$2"
  local ALPHA_UP="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  local ALPHA_LOW="abcdefghijklmnopqrstuvwxyz"
  local shifted_up="${ALPHA_UP:$shift}${ALPHA_UP:0:$shift}"
  local shifted_low="${ALPHA_LOW:$shift}${ALPHA_LOW:0:$shift}"
  echo "$text" | tr "${ALPHA_UP}${ALPHA_LOW}" "${shifted_up}${shifted_low}"
}

rot13(){
  echo "$1" | tr 'A-Za-z' 'N-ZA-Mn-za-m'
}

atbash(){
  local text="$1"
  echo "$text" | tr 'A-Za-z' 'Z-Az-a'
}

caesar_bruteforce(){
  local text="$1"
  for s in $(seq 1 25); do
    local forward=$((26 - s))
    local candidate
    candidate=$(rot_n $forward "$text")
    printf "Shift %2d -> %s\n" "$s" "$candidate"
  done
}

vigenere_process(){
  local mode="$1"; local key="$2"; local text="$3"
  key=$(echo "$key" | tr -cd 'A-Za-z' | tr 'a-z' 'A-Z')
  if [ -z "$key" ]; then
    echo "Key must contain letters."
    return 1
  fi
  awk -v mode="$mode" -v key="$key" '
  function mod(a,b){ return (a % b + b) % b }
  BEGIN{ kl=length(key); ki=1 }
  {
    for(i=1;i<=length($0);i++){
      c=substr($0,i,1)
      if (c ~ /[A-Za-z]/) {
        k = substr(key, ki, 1)
        if (k == "") { ki=1; k=substr(key,1,1) }
        shift = index("ABCDEFGHIJKLMNOPQRSTUVWXYZ", k) - 1
        if (mode == "dec") shift = -shift
        if (c ~ /[A-Z]/) { base = 65; val = ord(c) - base; n = mod(val + shift, 26); printf "%c", base + n }
        else { base = 97; val = ord(c) - base; n = mod(val + shift, 26); printf "%c", base + n }
        ki++; if (ki > kl) ki=1
      } else { printf "%s", c }
    }
    printf "\n"
  }
  function ord(str, r){ r = index("\0\1\2\3\4\5\6\7\10\11\12\13\14\15\16\17\20\21\22\23\24\25\26\27\30\31\32\33\34\35\36\37 !\"#$%&'\''()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~", str) - 1; if(r<0) r=sprintf("%d", str); return r }' <<< "$text"
}

vigenere_encode(){ vigenere_process "enc" "$1" "$2"; }
vigenere_decode(){ vigenere_process "dec" "$1" "$2"; }

base64_enc(){ echo -n "$1" | base64; }
base64_dec(){ echo -n "$1" | base64 --decode 2>/dev/null || echo "Invalid base64"; }

text_to_hex(){ echo -n "$1" | xxd -p | tr -d '\n'; echo; }
hex_to_text(){ echo -n "$1" | xxd -r -p 2>/dev/null || echo "Invalid hex"; echo; }

url_encode(){
  local s="$1"; local out="" c o
  for ((i=0;i<${#s};i++)); do
    c="${s:i:1}"
    case "$c" in [a-zA-Z0-9.~_-]) out+="$c" ;; ' ') out+='+' ;; *) printf -v o '%%%02X' "'$c"; out+="$o" ;; esac
  done
  echo "$out"
}
url_decode(){ printf '%b\n' "${1//%/\\x}" | sed 's/+/ /g'; }

text_to_ascii_codes(){ for ((i=0;i<${#1};i++)); do printf "%d " "'${1:i:1}"; done; echo; }
ascii_codes_to_text(){ for n in $1; do printf "\\$(printf '%03o' "$n")"; done; echo; }

# -----------------------
# NEW ENCODING METHODS
# -----------------------

# HTML Entities
text_to_html(){
  local text="$1"
  echo -n "$text" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g; s/'\''/\&apos;/g'
}

text_to_html_numeric(){
  local text="$1"
  for ((i=0;i<${#text};i++)); do
    printf "&#%d;" "'${text:i:1}"
  done
  echo
}

html_decode(){
  echo -n "$1" | sed 's/&amp;/\&/g; s/&lt;/</g; s/&gt;/>/g; s/&quot;/"/g; s/&apos;/'\''/g'
}

# Binary
text_to_binary(){
  local text="$1"
  for ((i=0;i<${#text};i++)); do
    printf "%08d " $(echo "obase=2; $(printf '%d' "'${text:i:1}")" | bc)
  done
  echo
}

binary_to_text(){
  local bin="$1"
  for b in $bin; do
    decimal=$(echo "ibase=2; $b" | bc)
    printf "\\$(printf '%03o' "$decimal")"
  done
  echo
}

# Octal
text_to_octal(){
  local text="$1"
  for ((i=0;i<${#text};i++)); do
    printf "%03o " "'${text:i:1}"
  done
  echo
}

octal_to_text(){
  local oct="$1"
  for o in $oct; do
    printf "\\$o"
  done
  echo
}

# Decimal
text_to_decimal(){
  local text="$1"
  for ((i=0;i<${#text};i++)); do
    printf "%d " "'${text:i:1}"
  done
  echo
}

decimal_to_text(){
  local dec="$1"
  for d in $dec; do
    printf "\\$(printf '%03o' "$d")"
  done
  echo
}

# Morse Code
declare -A morse_encode=(
  [A]=".-" [B]="-..." [C]="-.-." [D]="-.." [E]="." [F]="..-." [G]="--." [H]="...."
  [I]=".." [J]=".---" [K]="-.-" [L]=".-.." [M]="--" [N]="-." [O]="---" [P]=".--."
  [Q]="--.-" [R]=".-." [S]="..." [T]="-" [U]="..-" [V]="...-" [W]=".--" [X]="-..-"
  [Y]="-.--" [Z]="--.." [0]="-----" [1]=".----" [2]="..---" [3]="...--" [4]="....-"
  [5]="....." [6]="-...." [7]="--..." [8]="---.." [9]="----." [" "]="/"
)


declare -A morse_decode
for key in "${!morse_encode[@]}"; do
  morse_decode[${morse_encode[$key]}]=$key
done

text_to_morse(){
  local text=$(echo "$1" | tr '[:lower:]' '[:upper:]')
  local result=""
  for ((i=0;i<${#text};i++)); do
    char="${text:i:1}"
    if [[ -n "${morse_encode[$char]}" ]]; then
      result+="${morse_encode[$char]} "
    fi
  done
  echo "$result"
}
# Create Morse code maps
declare -A morse_encode=(
  [A]=".-" [B]="-..." [C]="-.-." [D]="-.." [E]="." [F]="..-." [G]="--." [H]="...."
  [I]=".." [J]=".---" [K]="-.-" [L]=".-.." [M]="--" [N]="-." [O]="---" [P]=".--."
  [Q]="--.-" [R]=".-." [S]="..." [T]="-" [U]="..-" [V]="...-" [W]=".--" [X]="-..-"
  [Y]="-.--" [Z]="--.." [0]="-----" [1]=".----" [2]="..---" [3]="...--" [4]="....-"
  [5]="....." [6]="-...." [7]="--..." [8]="---.." [9]="----." [" "]="/"
)

declare -A morse_decode
for key in "${!morse_encode[@]}"; do
  morse_decode[${morse_encode[$key]}]=$key
done

# Encode text → Morse
text_to_morse(){
  local text=$(echo "$1" | tr '[:lower:]' '[:upper:]')
  local result=""
  for ((i=0;i<${#text};i++)); do
    char="${text:i:1}"
    [[ -n "${morse_encode[$char]}" ]] && result+="${morse_encode[$char]} "
  done
  echo "$result"
}

# Decode Morse → text
morse_to_text(){
  local morse="$1"
  local result=""
  for code in $morse; do
    [[ -n "${morse_decode[$code]}" ]] && result+="${morse_decode[$code]}"
  done
  echo "$result"
}

# Example wrapper
do_morse(){
  mode=$(read_input "Text→Morse (t) or Morse→Text (m)? [t/m]: ")
  if [[ "$mode" =~ ^[Tt]$ ]]; then
    txt=$(read_input "Enter text: ")
    out=$(text_to_morse "$txt")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"
    push_hist "Text->Morse: $txt → $out"
  else
    morse=$(read_input "Enter morse (space-separated): ")
    out=$(morse_to_text "$morse")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"
    push_hist "Morse->Text: $morse → $out"
  fi
}

morse_to_text(){
  local morse="$1"
  local result=""
  for code in $morse; do
    if [[ -n "${morse_decode[$code]}" ]]; then
      result+="${morse_decode[$code]}"
    fi
  done
  echo "$result"
}

# XOR Cipher
xor_cipher(){
  local text="$1"
  local key="$2"
  local result=""
  local keylen=${#key}
  
  for ((i=0;i<${#text};i++)); do
    char="${text:i:1}"
    keychar="${key:$((i % keylen)):1}"
    xor_val=$(($(printf '%d' "'$char") ^ $(printf '%d' "'$keychar")))
    result+=$(printf '%02x' "$xor_val")
  done
  echo "$result"
}

xor_decipher(){
  local hex="$1"
  local key="$2"
  local result=""
  local keylen=${#key}
  local count=0
  
  for ((i=0;i<${#hex};i+=2)); do
    byte="${hex:i:2}"
    decimal=$((16#$byte))
    keychar="${key:$((count % keylen)):1}"
    xor_val=$((decimal ^ $(printf '%d' "'$keychar")))
    result+=$(printf "\\$(printf '%03o' "$xor_val")")
    ((count++))
  done
  echo "$result"
}

# -----------------------
# UI actions
# -----------------------
pause(){ echo; read -r -p "Press Enter to continue…" ; }

show_history(){
  if [ ${#HISTORY[@]} -eq 0 ]; then
    echo -e "${NEON_YELLOW}No session history yet.${RESET}"
  else
    echo -e "${NEON_GREEN}Session history:${RESET}"
    for i in "${!HISTORY[@]}"; do printf "%2d) %s\n" $((i+1)) "${HISTORY[$i]}"; done
  fi
}

# Original actions
do_rot13(){ txt=$(read_input "Enter text (ROT13): "); out=$(rot13 "$txt"); echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "ROT13: $txt → $out"; }
do_rotn(){ txt=$(read_input "Enter text: "); s=$(read_input "Enter shift (1-25): "); [[ "$s" =~ ^[0-9]+$ ]] && [ "$s" -ge 1 ] && [ "$s" -le 25 ] || { echo -e "${NEON_YELLOW}Invalid shift.${RESET}"; return; }; out=$(rot_n "$s" "$txt"); echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "ROT$s: $txt → $out"; }
do_caesar_brute(){ txt=$(read_input "Enter ciphertext to bruteforce: "); echo; caesar_bruteforce "$txt"; push_hist "Caesar brute: $txt"; }
do_atbash(){ txt=$(read_input "Enter text (Atbash): "); out=$(atbash "$txt"); echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Atbash: $txt → $out"; }
do_vigenere(){ mode=$(read_input "Encode (e) or Decode (d)? [e/d]: "); if [[ "$mode" =~ ^[Ee]$ ]]; then key=$(read_input "Enter key (letters only): "); txt=$(read_input "Enter plaintext: "); out=$(vigenere_encode "$key" "$txt"); echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Vigenere-enc key=$key: $txt → $out"; elif [[ "$mode" =~ ^[Dd]$ ]]; then key=$(read_input "Enter key (letters only): "); txt=$(read_input "Enter ciphertext: "); out=$(vigenere_decode "$key" "$txt"); echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Vigenere-dec key=$key: $txt → $out"; else echo "Cancelled."; fi }
do_base64(){ mode=$(read_input "Encode (e) or Decode (d)? [e/d]: "); if [[ "$mode" =~ ^[Ee]$ ]]; then txt=$(read_input "Enter text to base64-encode: "); out=$(base64_enc "$txt"); echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Base64-enc: $txt → $out"; else txt=$(read_input "Enter base64 to decode: "); out=$(base64_dec "$txt"); echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Base64-dec: $txt → $out"; fi }
do_hex(){ mode=$(read_input "Text→Hex (t) or Hex→Text (h)? [t/h]: "); if [[ "$mode" =~ ^[Tt]$ ]]; then txt=$(read_input "Enter text: "); out=$(text_to_hex "$txt"); echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Text->Hex: $txt → $out"; else hex=$(read_input "Enter hex (no 0x, just digits): "); out=$(hex_to_text "$hex"); echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Hex->Text: $hex → $out"; fi }
do_url(){ mode=$(read_input "Encode (e) or Decode (d)? [e/d]: "); if [[ "$mode" =~ ^[Ee]$ ]]; then txt=$(read_input "Enter text to URL-encode: "); out=$(url_encode "$txt"); echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "URL-enc: $txt → $out"; else txt=$(read_input "Enter percent-encoded string: "); out=$(url_decode "$txt"); echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "URL-dec: $txt → $out"; fi }
do_ascii(){ mode=$(read_input "Text->Codes (t) or Codes->Text (c)? [t/c]: "); if [[ "$mode" =~ ^[Tt]$ ]]; then txt=$(read_input "Enter text: "); out=$(text_to_ascii_codes "$txt"); echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Text->ASCII: $txt → $out"; else codes=$(read_input "Enter numbers separated by spaces: "); out=$(ascii_codes_to_text "$codes"); echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "ASCII->Text: $codes → $out"; fi }

# NEW actions
do_html(){ 
  mode=$(read_input "Named (n), Numeric (u), or Decode (d)? [n/u/d]: ")
  if [[ "$mode" =~ ^[Nn]$ ]]; then
    txt=$(read_input "Enter text: "); out=$(text_to_html "$txt")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "HTML-named: $txt → $out"
  elif [[ "$mode" =~ ^[Uu]$ ]]; then
    txt=$(read_input "Enter text: "); out=$(text_to_html_numeric "$txt")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "HTML-numeric: $txt → $out"
  else
    txt=$(read_input "Enter HTML entities: "); out=$(html_decode "$txt")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "HTML-dec: $txt → $out"
  fi
}

do_binary(){
  mode=$(read_input "Text→Binary (t) or Binary→Text (b)? [t/b]: ")
  if [[ "$mode" =~ ^[Tt]$ ]]; then
    txt=$(read_input "Enter text: "); out=$(text_to_binary "$txt")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Text->Binary: $txt → $out"
  else
    bin=$(read_input "Enter binary (space-separated): "); out=$(binary_to_text "$bin")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Binary->Text: $bin → $out"
  fi
}

do_octal(){
  mode=$(read_input "Text→Octal (t) or Octal→Text (o)? [t/o]: ")
  if [[ "$mode" =~ ^[Tt]$ ]]; then
    txt=$(read_input "Enter text: "); out=$(text_to_octal "$txt")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Text->Octal: $txt → $out"
  else
    oct=$(read_input "Enter octal (space-separated): "); out=$(octal_to_text "$oct")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Octal->Text: $oct → $out"
  fi
}

do_decimal(){
  mode=$(read_input "Text→Decimal (t) or Decimal→Text (d)? [t/d]: ")
  if [[ "$mode" =~ ^[Tt]$ ]]; then
    txt=$(read_input "Enter text: "); out=$(text_to_decimal "$txt")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Text->Decimal: $txt → $out"
  else
    dec=$(read_input "Enter decimal (space-separated): "); out=$(decimal_to_text "$dec")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Decimal->Text: $dec → $out"
  fi
}

do_morse(){
  mode=$(read_input "Text→Morse (t) or Morse→Text (m)? [t/m]: ")
  if [[ "$mode" =~ ^[Tt]$ ]]; then
    txt=$(read_input "Enter text: "); out=$(text_to_morse "$txt")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Text->Morse: $txt → $out"
  else
    morse=$(read_input "Enter morse (space-separated): "); out=$(morse_to_text "$morse")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "Morse->Text: $morse → $out"
  fi
}

do_xor(){
  mode=$(read_input "Encode (e) or Decode (d)? [e/d]: ")
  key=$(read_input "Enter XOR key: ")
  if [[ "$mode" =~ ^[Ee]$ ]]; then
    txt=$(read_input "Enter text: "); out=$(xor_cipher "$txt" "$key")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "XOR-enc key=$key: $txt → $out"
  else
    hex=$(read_input "Enter hex string: "); out=$(xor_decipher "$hex" "$key")
    echo -e "${NEON_PINK}→ ${BOLD}$out${RESET}"; push_hist "XOR-dec key=$key: $hex → $out"
  fi
}

# -----------------------
# Main menu loop
# -----------------------
while true; do
  banner
  echo -e "${NEON_GREEN}${BOLD}═══ Classic Methods ═══${RESET}"
  echo -e "${NEON_CYAN}1)${RESET} ROT (ROT13 / ROT-n / BruteForce)"
  echo -e "${NEON_CYAN}2)${RESET} Atbash cipher"
  echo -e "${NEON_CYAN}3)${RESET} Vigenère (encode / decode)"
  echo -e "${NEON_CYAN}4)${RESET} Base64 (encode / decode)"
  echo -e "${NEON_CYAN}5)${RESET} Hex (text ↔ hex)"
  echo -e "${NEON_CYAN}6)${RESET} URL encode / decode"
  echo -e "${NEON_CYAN}7)${RESET} ASCII codes ↔ text"
  
  echo -e "${NEON_GREEN}${BOLD}═══ New Methods ═══${RESET}"
  echo -e "${NEON_CYAN}8)${RESET} HTML Entities"
  echo -e "${NEON_CYAN}9)${RESET} Binary ↔ text"
  echo -e "${NEON_CYAN}10)${RESET} Octal ↔ text"
  echo -e "${NEON_CYAN}11)${RESET} Decimal ↔ text"
  echo -e "${NEON_CYAN}12)${RESET} Morse Code"
  echo -e "${NEON_CYAN}13)${RESET} XOR Cipher"
  
  echo -e "${NEON_GREEN}${BOLD}═══ Utils ═══${RESET}"
  echo -e "${NEON_CYAN}h)${RESET} Show session history"
  echo -e "${NEON_CYAN}q)${RESET} Quit"
  sep
  choice=$(read_input "Choose an option: ")

  case "$choice" in
    1)
      rot_choice=$(read_input "Choose ROT type: 1) ROT13 2) ROT-n 3) Brute-force [1/2/3]: ")
      case "$rot_choice" in
        1) do_rot13 ;;
        2) do_rotn ;;
        3) do_caesar_brute ;;
        *) echo -e "${NEON_YELLOW}Invalid choice.${RESET}" ;;
      esac
      pause
      ;;
    2) do_atbash; pause ;;
    3) do_vigenere; pause ;;
    4) do_base64; pause ;;
    5) do_hex; pause ;;
    6) do_url; pause ;;
    7) do_ascii; pause ;;
    8) do_html; pause ;;
    9) do_binary; pause ;;
    10) do_octal; pause ;;
    11) do_decimal; pause ;;
    12) do_morse; pause ;;
    13) do_xor; pause ;;
    h|H) show_history; pause ;;
    q|Q) echo -e "${NEON_BLUE}Bye! ${HEART} Stay neon and cute.${RESET}"; exit 0 ;;
    *) echo -e "${NEON_YELLOW}Invalid choice.${RESET}"; pause ;;
  esac
done