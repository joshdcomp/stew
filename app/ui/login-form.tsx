import { signIn, signOut } from '@/auth.config'
import authCheck from '@/app/lib/auth-fn'

export default async function LoginForm() {
  const session = await authCheck()
  // login page currently redirects to the dashboard if session exists, but just in case this is rendered in a modal
  if (session) {
    const userInfo = JSON.stringify(session || {}, null, 2)
    return (
      <div>
        <h2>Already logged in!</h2>
        <p>User:</p>
        <pre><code>{userInfo}</code></pre>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button type="submit">Switch user</button>
        </form>
      </div>
    )
  }
  else {
    return (
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <button type="submit">Sign in with Google</button>
      </form>
    )
  }
}
