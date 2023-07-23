import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import LoginForm from "./forms/login-form";

const LoginDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Login to your account to continue
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
