export const useEncoding = () => {
  // ROT13
  const rot13 = (text: string): string =>
    text.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(((code - base + 13) % 26) + base);
    });

  // ROT-n
  const rotN = (text: string, shift: number): string => {
    shift = shift % 26;
    return text.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(((code - base + shift) % 26) + base);
    });
  };

  // ROT brute
  const rotBrute = (text: string): string => {
    let result = '';
    for (let shift = 1; shift <= 25; shift++) {
      result += `Shift ${shift}: ${rotN(text, shift)}\n`;
    }
    return result.trim();
  };

  // Base64
  const base64Encode = (text: string) => btoa(text);
  const base64Decode = (text: string) => {
    try { return atob(text); } catch { return 'Invalid Base64'; }
  };

  // Hex
  const hexEncode = (text: string) =>
    Array.from(text).map(c => c.charCodeAt(0).toString(16).padStart(2,'0')).join('');
  const hexDecode = (text: string) =>
    text.replace(/\s/g, '').match(/.{1,2}/g)?.map(b => String.fromCharCode(parseInt(b,16))).join('') || 'Invalid Hex';

  // URL
  const urlEncode = (text: string) => encodeURIComponent(text);
  const urlDecode = (text: string) => {
    try { return decodeURIComponent(text); } catch { return 'Invalid URL'; }
  };

  // ASCII
  const textToAscii = (text: string) => Array.from(text).map(c => c.charCodeAt(0)).join(' ');
  const asciiToText = (text: string) =>
    text.split(/\s+/).map(n => String.fromCharCode(parseInt(n,10))).join('');

  // Binary
  const binaryEncode = (text: string) =>
    Array.from(text).map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ');
  const binaryDecode = (text: string) =>
    text.split(/\s+/).map(b => String.fromCharCode(parseInt(b,2))).join('');

  // Octal
  const octalEncode = (text: string) =>
    Array.from(text).map(c => c.charCodeAt(0).toString(8).padStart(3,'0')).join(' ');
  const octalDecode = (text: string) =>
    text.split(/\s+/).map(o => String.fromCharCode(parseInt(o, 8))).join('');

  // Decimal
  const decimalEncode = (text: string) =>
    Array.from(text).map(c => c.charCodeAt(0).toString(10)).join(' ');
  const decimalDecode = (text: string) =>
    text.split(/\s+/).map(d => String.fromCharCode(parseInt(d, 10))).join('');

  // HTML Entities
  const htmlEncode = (text: string) => {
    const map: Record<string,string> = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'};
    return text.replace(/[&<>"']/g, c => map[c]);
  };
  const htmlDecode = (text: string) => {
    const map: Record<string,string> = {amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"};
    return text.replace(/&(amp|lt|gt|quot|apos);/g, (_, e) => map[e]);
  };

  // Morse
  const morseMap: Record<string,string> = {
    'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.',
    'H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.',
    'O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-',
    'V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',' ':'/','0':'-----',
    '1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....',
    '7':'--...','8':'---..','9':'----.'
  };
  const morseEncode = (text: string) =>
    text.toUpperCase().split('').map(c => morseMap[c] || c).join(' ');
  const morseDecode = (text: string) => {
    const rev: Record<string,string> = Object.fromEntries(Object.entries(morseMap).map(([k,v]) => [v,k]));
    return text.split(/\s+/).map(c => rev[c] || c).join('');
  };

  // Atbash
  const atbash = (text: string) =>
    text.replace(/[a-zA-Z]/g, c => {
      const code = c.charCodeAt(0);
      if (c >= 'A' && c <= 'Z') return String.fromCharCode(90 - (code - 65));
      if (c >= 'a' && c <= 'z') return String.fromCharCode(122 - (code - 97));
      return c;
    });

  // Vigenère
  const vigenereEncode = (key: string, text: string) => {
    key = key.toUpperCase(); let ki=0;
    return text.split('').map(c => {
      if (/[a-zA-Z]/.test(c)) {
        const base = c <= 'Z' ? 65 : 97;
        const shift = key.charCodeAt(ki % key.length) - 65; ki++;
        return String.fromCharCode(((c.charCodeAt(0)-base+shift)%26)+base);
      }
      return c;
    }).join('');
  };
  const vigenereDecode = (key: string, text: string) => {
    key = key.toUpperCase(); let ki=0;
    return text.split('').map(c => {
      if (/[a-zA-Z]/.test(c)) {
        const base = c <= 'Z' ? 65 : 97;
        const shift = 26 - (key.charCodeAt(ki % key.length)-65); ki++;
        return String.fromCharCode(((c.charCodeAt(0)-base+shift)%26)+base);
      }
      return c;
    }).join('');
  };

  // XOR cipher
  const xorCipher = (text: string, key: string) => {
    let result = '';
    for(let i=0;i<text.length;i++){
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  };

  return {
    rot13, rotN, rotBrute,
    base64Encode, base64Decode,
    hexEncode, hexDecode,
    urlEncode, urlDecode,
    textToAscii, asciiToText,
    binaryEncode, binaryDecode,
    octalEncode, octalDecode,
    decimalEncode, decimalDecode,
    htmlEncode, htmlDecode,
    morseEncode, morseDecode,
    atbash,
    vigenereEncode, vigenereDecode,
    xorCipher
  };
};
