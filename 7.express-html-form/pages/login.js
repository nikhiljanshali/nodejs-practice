export function login() {
  return `
    <form action="/submit" method="post">
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">Submit</button>
    </form>
    `;
}
