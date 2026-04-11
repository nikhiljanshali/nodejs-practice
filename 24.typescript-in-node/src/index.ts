const hello = "Hello, World!";
const greeting = (name: string): string => {
    console.log(`${hello}, ${name}!`);
    return `${hello}, ${name}!`;
}

greeting("Alice");