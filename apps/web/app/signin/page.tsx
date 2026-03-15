import AuthForm from "../components/AuthForm";

export default function SignInPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
      <AuthForm />
    </div>
  );
}
