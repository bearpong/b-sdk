export function unsafeFastParseEther(value: string): string {
    const parts = value.split('.');
    parts[0] = parts[0] || '';
    parts[1] = parts[1] || '';

    const zerosToAdd = 18 - parts[1].length;
    let etherValue = `${parts[0] !== '0' ? parts[0] : ''}${parts[1]}`;

    for (let i = 0; i < zerosToAdd; i++) {
        etherValue += '0';
    }

    return etherValue;
}
