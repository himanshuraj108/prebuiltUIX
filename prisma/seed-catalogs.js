
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CATALOG_DATA = [
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
        items: ["Container", "Box", "Grid", "Flex", "Stack", "Section", "Divider", "Aspect Ratio", "Masonry", "Split Layout", "Resizable Panels", "Sticky Layout", "Scroll Area"]
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

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

async function main() {
    console.log('Start seeding catalogs (No Transaction Mode)...');

    // Clear existing catalogs? No, we want to keep them safe.

    for (const category of CATALOG_DATA) {
        for (const item of category.items) {
            const slug = slugify(item);

            try {
                // Step 1: Check if exists
                const existing = await prisma.catalog.findUnique({
                    where: { slug: slug }
                });

                if (existing) {
                    console.log(`Skipped (Exists): ${item}`);
                    // Optional: Update if needed, but separate call
                    /*
                    await prisma.catalog.update({
                      where: { slug: slug },
                      data: { group: category.group }
                    });
                    */
                } else {
                    // Step 2: Create if not exists
                    await prisma.catalog.create({
                        data: {
                            name: item,
                            slug: slug,
                            group: category.group,
                            description: `Collection of ${item} components`
                        }
                    });
                    console.log(`Created: ${item} (${category.group})`);
                }
            } catch (e) {
                console.error(`Error processing ${item}:`, e);
            }
        }
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
