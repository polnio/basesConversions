const symbols = '0123456789ABCDEF'.split('')
const convertObj = {'0': '0000', '1': '0001', '2': '0010','3': '0011','4': '0100','5': '0101','6': '0110','7': '0111','8': '1000','9': '1001','A': '1010','B': '1011','C': '1100','D': '1101','E': '1110', 'F': '1111'}

function trim (s: string, c: string) {
    if (c === "]") c = "\\]";
    if (c === "^") c = "\\^";
    if (c === "\\") c = "\\\\";
    return s.replace(new RegExp(
      "^[" + c + "]+|[" + c + "]+$", "g"
    ), "");
  }

export function decToBin(n: number) {
    if (n === 0) return '0'
    let r = ''
    while (n > 0) {
        r = (n % 2).toString() + r
        n = Math.floor(n / 2)
    }
    return r
}

export function decToHex(n: number) {
    if (n === 0) return '0'
    let r = ''
    while (n > 0) {
        r = symbols[(n % 16)] + r
        n = Math.floor(n / 16)
    }
    return r
}

export function binToDec (nb: string) {
    let r = 0
    nb.split('').forEach(n => {
        r = r * 2 + parseInt(n)
    })
    return r
}

export function binToHex (bin: string) {
    let r = ''
    const binKeysNumber = Object.values(convertObj).map(n => parseInt(n))
    for (let i = bin.length; i > 0; i-= 4) {
        const query = parseInt(bin.substring(Math.max(i-4, 0), i))
        if (!binKeysNumber.includes(query)) return ''
        r = Object.entries(convertObj).find(([h, b]) => parseInt(b) === query)![0] + r
    }
    return r
}

export function hexToDec (nb: string) {
    let r = 0
    nb.split('').forEach(n => {
        r = r * 16 + symbols.indexOf(n.toUpperCase())
    })
    return r
}

export function hexToBin (hex: string) {
    let r = ''
    hex.split('').forEach(c => {
        if (!Object.keys(convertObj).includes(c.toUpperCase())) return ''
        r += convertObj[c.toUpperCase() as keyof typeof convertObj]
    })
    return trim(r, '0')
}

console.log(decToHex(55))
