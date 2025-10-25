import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Import all pages
import Home from "@/pages/Home";
import Stopwatch from "@/pages/Stopwatch";
import LapTimer from "@/pages/LapTimer";
import Countdown from "@/pages/Countdown";
import Interval from "@/pages/Interval";
import MultiTimer from "@/pages/MultiTimer";
import History from "@/pages/History";
import Settings from "@/pages/Settings";
import Templates from "@/pages/Templates";
import Statistics from "@/pages/Statistics";
import Leaderboard from "@/pages/Leaderboard";
import Tips from "@/pages/Tips";
import Help from "@/pages/Help";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/stopwatch"} component={Stopwatch} />
      <Route path={"/lap-timer"} component={LapTimer} />
      <Route path={"/countdown"} component={Countdown} />
      <Route path={"/interval"} component={Interval} />
      <Route path={"/multi-timer"} component={MultiTimer} />
      <Route path={"/history"} component={History} />
      <Route path={"/settings"} component={Settings} />
      <Route path={"/templates"} component={Templates} />
      <Route path={"/statistics"} component={Statistics} />
      <Route path={"/leaderboard"} component={Leaderboard} />
      <Route path={"/tips"} component={Tips} />
      <Route path={"/help"} component={Help} />
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

