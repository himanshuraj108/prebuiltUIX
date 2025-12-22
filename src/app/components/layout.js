
import { LayoutSidebar } from "@/components/layout-sidebar";

export default function ComponentsLayout({ children }) {
    return (
        <div className="flex min-h-screen pt-16">
            <LayoutSidebar />
            <div className="flex-1 ml-64 min-h-[calc(100vh-4rem)]">
                {children}
            </div>
        </div>
    );
}
