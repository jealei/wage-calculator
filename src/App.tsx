import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginScreen } from "@/components/LoginScreen";
import { WageCalculator } from "@/components/WageCalculator";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("wage-auth") === "true"
  );

  function handleLogin() {
    sessionStorage.setItem("wage-auth", "true");
    setIsAuthenticated(true);
  }

  function handleLogout() {
    sessionStorage.removeItem("wage-auth");
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="max-w-2xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold">Lønnskalkulator</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logg ut
          </Button>
        </div>
      </header>
      <main className="p-4 pb-12">
        <WageCalculator />
      </main>
    </div>
  );
}

export default App;
