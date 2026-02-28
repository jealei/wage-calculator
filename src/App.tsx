import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LoginScreen } from "@/components/LoginScreen";
import { WageCalculator } from "@/components/WageCalculator";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("wage-auth") === "true"
  );
  const [dark, setDark] = useState(
    () => localStorage.getItem("wage-theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("wage-theme", dark ? "dark" : "light");
  }, [dark]);

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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="dark-mode" className="text-sm cursor-pointer">
                Mørk
              </Label>
              <Switch
                id="dark-mode"
                checked={dark}
                onCheckedChange={setDark}
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logg ut
            </Button>
          </div>
        </div>
      </header>
      <main className="p-4 pb-12">
        <WageCalculator />
      </main>
    </div>
  );
}

export default App;
