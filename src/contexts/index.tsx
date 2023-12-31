import ThemeWrapper from "./theme";

export default function ContextWrapper({ children }: { children: React.ReactNode }) {
    return <ThemeWrapper>{children}</ThemeWrapper>;
};