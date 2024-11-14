# react-screen-assist

A React accessibility package for screen reading and content narration with advanced features for web applications, especially useful in e-commerce and interactive sites.

## Installation

Install with npm, yarn, or pnpm:

```bash
npm install react-screen-assist
```
or

```bash
yarn add react-screen-assist
```
or

```bash
pnpm add react-screen-assist
```

## Quick Start

### 1. Wrap Your Application with the ScreenReaderProvider

This provider enables screen reader functionality throughout your app.

```tsx
import { ScreenReaderProvider } from 'react-screen-assist';

function App({ children }) {
    return (
        <ScreenReaderProvider>
            {children}
        </ScreenReaderProvider>
    );
}
```

### 2. Use AccessibleElement for Screen-Readable Content

This component allows you to wrap any content you want to be screen-readable, with optional priority settings.

```tsx
import { AccessibleElement } from 'react-screen-assist';

function ProductCard({ product }) {
    return (
        <AccessibleElement
            description={`Product: ${product.name}, Price: ${product.price}`}
            priority="high"
        >
            {/*Your product card content*/}
        </AccessibleElement>
    );
}
```

### 3. Customize with the useScreenReader Hook

For more control, use the useScreenReader hook to access screen reader functions directly.

```tsx
import { useScreenReader } from 'react-screen-assist';

function CustomComponent() {
    const { speak, isEnabled, toggleScreenReader } = useScreenReader();

    return (
        <div>
            <button onClick={() => speak("Hello, world!")}>
                Read This
            </button>
            <button onClick={toggleScreenReader}>
                {isEnabled ? 'Disable' : 'Enable'} Screen Reader
            </button>
        </div>
    );
}
```

## Features

- 🎯 **Priority-Based Speech Queuing**: Control priority of spoken content.
- 🎛️ **Adjustable Speech Rate and Pitch**: Customize speech settings.
- ⏯️ **Pause, Resume, and Stop Controls**: Manage speech playback.
- 🔄 **Automatic Focus Handling**: Read content on focus or mouse events.
- 🎨 **Customizable Styles**: Style elements as needed.
- 📱 **Mobile-Friendly**: Accessible across devices.
- 💻 **TypeScript Support**: Includes TypeScript types for seamless integration.

## API Reference

### `<ScreenReaderProvider>`

This provider wraps your application, enabling screen reader context across all child components.

```tsx
<ScreenReaderProvider>
    <YourApp />
</ScreenReaderProvider>
```

### `useScreenReader` Hook

The `useScreenReader` hook provides full access to screen reader functionalities.

```typescript
const {
    isEnabled, // boolean indicating if screen reader is enabled
    toggleScreenReader, // Function to enable/disable screen reader
    speak, // Function to speak text with optional priority
    pause, // Function to pause speech
    resume, // Function to resume speech
    stop, // Function to stop speech
    rate, // Current speech rate
    setRate, // Function to set speech rate
    pitch, // Current pitch level
    setPitch // Function to set pitch level
} = useScreenReader();
```

### `<AccessibleElement>`

An element wrapper that makes content accessible for screen readers. Automatically triggers speech on focus and hover.

**Props**

- `children`: The content to render inside the element.
- `description` (optional): The text to be read by the screen reader.
- `priority` (optional): Determines the urgency of spoken content ('high', 'normal', 'low').
- `className` (optional): Custom CSS classes.

```tsx
<AccessibleElement
    description="This content will be read by the screen reader"
    priority="normal"
    className="custom-styles"
>
    {/*Your content*/}
</AccessibleElement>
```

## Examples

### Example 1: E-commerce Product Card

```tsx
function ProductCard({ product }) {
    return (
        <AccessibleElement
            description={`${product.name}. Price: ${product.price} dollars. ${product.inStock ? 'In stock' : 'Out of stock'}`}
            priority="normal"
        >
            <div className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
            </div>
        </AccessibleElement>
    );
}
```

### Example 2: Navigation Menu with Focus Triggers

```tsx
function NavigationMenu() {
    const { speak } = useScreenReader();

    return (
        <nav>
            <AccessibleElement description="Main navigation menu">
                <ul>
                    {menuItems.map(item => (
                        <li key={item.id}>
                            <button
                                onFocus={() => speak(item.name, 'high')}
                                onMouseEnter={() => speak(item.name, 'low')}
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </AccessibleElement>
        </nav>
    );
}
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## License

MIT © Idris Kulubi
