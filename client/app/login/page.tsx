import LoginForm from "@client/components/forms/login-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@client/components/ui/card";

const LoginPage = () => {
  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
