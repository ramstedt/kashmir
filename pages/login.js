import { supabase } from "../utils/supabase";

export default function Login() {
  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;

    await supabase.auth.signInWithOtp({
      email: email,
    });
  }
  return (
    <div className="max-w-[300px] m-auto">
      <h1>Please enter your email to process your order</h1>
      <h2>You will be sent an email containing a link to the checkout page</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" className="h-8" />
        </div>
        <div className="m-y-2 w-full">
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
}
