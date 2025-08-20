// Example utility function to test
function add(a: number, b: number): number {
  return a + b
}

function greet(name: string): string {
  return `Hello, ${name}!`
}

describe('Utility Functions', () => {
  it('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5)
    expect(add(-1, 1)).toBe(0)
    expect(add(0, 0)).toBe(0)
  })

  it('should create a greeting message', () => {
    expect(greet('World')).toBe('Hello, World!')
    expect(greet('React Kolkata')).toBe('Hello, React Kolkata!')
  })
})