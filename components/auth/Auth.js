import { supabase } from "../../utils/supabase";

export default function Auth() {
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    await supabase.auth.signInWithOtp({
      email: email,
    });
    alert("check your email to get link");
  };
  return (
    <div>
      <h1>Welcome to Kashmir</h1>
      <p>Please enter your email to view the menu and process an order</p>
      <form onSubmit={handleLogin} className="flex flex-col space-y-3">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" className="h-8" />
        </div>
        <div className="m-y-2 w-full">
          <button type="submit">Log in</button>
        </div>
      </form>
      <p>The link to the menu will be sent to your email </p>
    </div>
  );
}
