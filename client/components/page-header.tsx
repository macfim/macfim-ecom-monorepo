import LoginDialog from "./login-dialog";

const PageHeader = () => {
  return (
    <header className="bg-gray-100 py-4">
      <div className="container mx-auto px-4 flex items-center">
        <h1 className="flex-1 text-2xl font-bold">Ecommerce</h1>
        <nav className="flex-1">
          <ul className="flex justify-center items-center space-x-4">
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Account</li>
          </ul>
        </nav>
        <div className="flex-1 flex justify-end">
          <LoginDialog />
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
