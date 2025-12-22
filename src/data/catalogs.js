
export const CATALOG_GROUPS = [
    {
        group: "Foundation / Core Components",
        items: ["Colors", "Typography", "Font sizes", "Line height", "Spacing", "Shadows", "Border radius", "Z-index", "Breakpoints", "Icons", "SVGs", "Tokens", "Themes"]
    },
    {
        group: "Primitive / Atomic Components",
        items: ["Button", "Icon Button", "Text", "Heading", "Label", "Link", "Image", "Avatar", "Badge", "Divider", "Chip / Tag", "Spacer"]
    },
    {
        group: "Form Components",
        items: ["Input", "Textarea", "Password Input", "Email Input", "Number Input", "Checkbox", "Radio Button", "Toggle / Switch", "Select", "Multi-Select", "Dropdown", "Combobox", "Date Picker", "Time Picker", "Date Range Picker", "File Upload", "OTP Input", "Slider", "Rating", "Color Picker", "Search Input"]
    },
    {
        group: "Layout Components",
        items: ["Hero", "Container", "Box", "Grid", "Flex", "Stack", "Section", "Divider", "Aspect Ratio", "Masonry", "Split Layout", "Resizable Panels", "Sticky Layout", "Scroll Area"]
    },
    {
        group: "Navigation Components",
        items: ["Navbar", "Header", "Footer", "Sidebar", "Drawer", "Menu", "Dropdown Menu", "Context Menu", "Breadcrumb", "Tabs", "Pagination", "Stepper", "Tree View", "Mega Menu"]
    },
    {
        group: "Data Display Components",
        items: ["Card", "Table", "Data Table", "List", "Description List", "Accordion", "Collapse", "Tooltip", "Popover", "Avatar Group", "Timeline", "Calendar", "Statistic", "Counter", "Progress Bar", "Progress Circle", "Skeleton Loader"]
    },
    {
        group: "Feedback / Status Components",
        items: ["Alert", "Toast", "Snackbar", "Modal", "Dialog", "Confirmation Dialog", "Loader", "Spinner", "Backdrop", "Empty State", "Error State", "Success State", "Warning State"]
    },
    {
        group: "Overlay Components",
        items: ["Modal", "Drawer", "Tooltip", "Popover", "Dropdown", "Context Menu", "Bottom Sheet", "Lightbox", "Image Viewer", "Fullscreen Overlay"]
    },
    {
        group: "Media Components",
        items: ["Image Gallery", "Carousel", "Slider", "Video Player", "Audio Player", "Media Card", "Lazy Image", "Zoomable Image", "File Preview", "PDF Viewer"]
    },
    {
        group: "Data Visualization Components",
        items: ["Line Chart", "Bar Chart", "Pie Chart", "Area Chart", "Donut Chart", "Radar Chart", "Heatmap", "Scatter Plot", "Gauge", "Map", "Dashboard Widget", "KPI Cards"]
    },
    {
        group: "Authentication Components",
        items: ["Login Form", "Signup Form", "Forgot Password", "Reset Password", "OTP Verification", "Email Verification", "Phone Verification", "Social Login Buttons", "CAPTCHA", "MFA Components"]
    },
    {
        group: "E-Commerce Components",
        items: ["Product Card", "Product Grid", "Product Gallery", "Price Tag", "Discount Badge", "Cart Drawer", "Cart Item", "Checkout Form", "Payment Button", "Order Summary", "Wishlist", "Reviews & Ratings"]
    },
    {
        group: "Admin / Dashboard Components",
        items: ["Sidebar Navigation", "Data Table with Filters", "Analytics Cards", "User Management Table", "Role Selector", "Permission Matrix", "Logs Viewer", "Settings Panel", "Admin Forms"]
    },
    {
        group: "Utility / Helper Components",
        items: ["Error Boundary", "Portal", "Lazy Loader", "Suspense Wrapper", "Permission Wrapper", "Auth Guard", "Theme Switcher", "Language Switcher", "Clipboard Copy", "Scroll To Top"]
    },
    {
        group: "Internationalization Components",
        items: ["Language Selector", "RTL Layout", "Currency Formatter", "Date Formatter", "Number Formatter", "Locale Switcher"]
    },
    {
        group: "Accessibility Components",
        items: ["Focus Trap", "Skip to Content", "Screen Reader Text", "Keyboard Navigation", "ARIA Wrappers", "Accessible Modals", "Accessible Forms"]
    },
    {
        group: "Advanced / Composite Components",
        items: ["Search with Filters", "Advanced Forms", "Dynamic Tables", "Drag & Drop Boards", "Kanban Board", "Chat UI", "Notification Center", "File Manager", "Code Editor", "Markdown Editor"]
    },
    {
        group: "Experimental / Modern Components",
        items: ["Command Palette", "AI Chat Box", "Prompt Input", "Voice Input", "Gesture Components", "Realtime Collaboration UI", "Live Cursor", "Presence Indicator"]
    }
];

// Helper to flat list if needed
export const ALL_CATALOGS = CATALOG_GROUPS.flatMap(g =>
    g.items.map(item => ({
        name: item,
        slug: item.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''),
        group: g.group
    }))
);
