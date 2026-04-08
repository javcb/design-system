# Forms Section Build Guide

This document outlines best practices and architectural decisions for building the 5 remaining Layer 2 composite components in the Forms section.

## Forms Section Overview (0/5)

The Forms section provides higher-level components that wrap Layer 1 primitives (Input, Textarea, Select, Checkbox, Radio, etc.) into complete form field solutions.

| Component | Status | Purpose |
|-----------|--------|---------|
| FormField | 🔲 | Label + Input + HelperText composition |
| FormGroup | 🔲 | Fieldset grouping for related fields |
| SearchInput | 🔲 | Input with leading icon + clear button |
| DatePicker | 🔲 | Calendar popup with date selection |
| FileUpload | 🔲 | Drag-and-drop file upload zone |

## FormField Component

**Purpose:** Combine Label + Input + HelperText into a single reusable unit with validation state management.

**Structure:**
```tsx
export interface FormFieldProps {
  label: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  // ... plus all Input props
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, helperText, error, required, ...inputProps }, ref) => (
    <div className="flex flex-col gap-1">
      <Label required={required}>{label}</Label>
      <Input ref={ref} {...inputProps} status={error ? 'error' : undefined} />
      <HelperText error={!!error}>{error || helperText}</HelperText>
    </div>
  )
);
FormField.displayName = 'FormField';
```

**Key Points:**
- Extends Input component with validation state (error message)
- Uses existing Label and HelperText Layer 1 components
- Maps form field states: default, focus, error, disabled
- All props pass through to Input via spread
- One prop (`status`) controls visual error state
- Stories: Default, Required, WithError, Disabled, WithHelperText

## FormGroup Component

**Purpose:** Group related form fields (like radio buttons, checkboxes) under a single fieldset legend.

**Structure:**
```tsx
export interface FormGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend: string;
  helperText?: string;
  required?: boolean;
}

export const FormGroup = React.forwardRef<HTMLFieldSetElement, FormGroupProps>(
  ({ legend, helperText, required, children, className, ...props }, ref) => (
    <fieldset ref={ref} className={cn('flex flex-col gap-3', className)} {...props}>
      <legend className="text-sm font-semibold text-neutral-900">
        {legend}
        {required && <span className="text-error ml-1">*</span>}
      </legend>
      {children}
      {helperText && <HelperText>{helperText}</HelperText>}
    </fieldset>
  )
);
FormGroup.displayName = 'FormGroup';
```

**Key Points:**
- Uses semantic `<fieldset>` and `<legend>` elements for accessibility
- Wrap RadioGroup or checkbox collection with FormGroup
- Supports required indicator and helper text
- Stories: RadioGroup (3 options), CheckboxGroup (multiple selections), WithHelperText, Required

## SearchInput Component

**Purpose:** Input with leading search icon + trailing clear button for quick text clearing.

**Structure:**
```tsx
export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ icon, onClear, value, onChange, className, ...props }, ref) => (
    <div className="relative flex items-center">
      <div className="absolute left-3 text-neutral-500 pointer-events-none">
        {icon || <Search size={18} />}
      </div>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        className={cn('pl-9 pr-9', className)}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange?.({ target: { value: '' } } as any);
            onClear?.();
          }}
          className="absolute right-3 text-neutral-500 hover:text-neutral-700"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
);
SearchInput.displayName = 'SearchInput';
```

**Key Points:**
- Wraps Input with position-relative and absolute icon/button positioning
- Default search icon, customizable via `icon` prop
- Clear button only shows when value is not empty
- `onClear` callback fires when clear button clicked
- Stories: Default, WithIcon, WithValue, Focus, Disabled

## DatePicker Component

**Purpose:** Calendar UI for selecting a date, with text input trigger and popover calendar.

**Structure:**
```tsx
export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ value, onChange, disabled, placeholder = 'Select date' }, ref) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            disabled={disabled}
            className="flex items-center gap-2 px-3 py-2 border border-border rounded-md"
          >
            <Calendar size={18} />
            {value ? value.toLocaleDateString() : placeholder}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  }
);
DatePicker.displayName = 'DatePicker';
```

**Key Points:**
- Uses Popover (Layer 2 Overlay component) for calendar
- Calendar calculation logic is separate (see DatePickerCalendar helper)
- Selected date shown as readable text in button
- Opens popover, user clicks date, popover closes automatically
- `onChange` callback fires with selected Date object
- Stories: Default, WithValue, Disabled, DateRange (optional extension)

## FileUpload Component

**Purpose:** Drag-and-drop file zone with file list and clear button.

**Structure:**
```tsx
export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  accept?: string;
  multiple?: boolean;
  onFilesChange?: (files: File[]) => void;
  maxSize?: number; // bytes
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ accept, multiple = false, onFilesChange, maxSize, className, ...props }, ref) => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [dragActive, setDragActive] = React.useState(false);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      addFiles(droppedFiles);
    };

    const addFiles = (newFiles: File[]) => {
      const filtered = newFiles.filter((f) => !maxSize || f.size <= maxSize);
      setFiles((prev) => (multiple ? [...prev, ...filtered] : filtered));
      onFilesChange?.(filtered);
    };

    return (
      <div
        ref={ref}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 transition-colors',
          dragActive && 'border-primary bg-primary/5',
          'border-border bg-surface',
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <Upload size={32} className="text-neutral-400" />
          <div className="text-center">
            <Text className="font-semibold">Drag files here or click to upload</Text>
            {accept && <Text size="sm" color="neutral-500">{accept}</Text>}
          </div>
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={(e) => addFiles(Array.from(e.target.files || []))}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file) => (
              <div key={file.name} className="flex items-center justify-between p-2 bg-surface-offset rounded">
                <Text size="sm">{file.name}</Text>
                <button
                  onClick={() => setFiles((prev) => prev.filter((f) => f !== file))}
                  className="text-error hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
FileUpload.displayName = 'FileUpload';
```

**Key Points:**
- Drag-over state changes border/background to indicate drop target
- Drag-drop and click both work; click opens file picker
- File list displayed below upload zone with remove buttons
- Optional `accept` prop restricts file types (e.g., "image/*,.pdf")
- Optional `maxSize` prop validates file size before adding
- `onFilesChange` callback fires with File[] array
- Stories: Default, ImageOnly (accept="image/*"), MultipleFiles, WithMaxSize, DragOverState

## Implementation Order

Follow this sequence to minimize dependency issues:

1. **FormField** — depends only on Label, HelperText, Input (all Layer 1)
2. **FormGroup** — depends only on HelperText (Layer 1)
3. **SearchInput** — depends only on Input (Layer 1) + X icon
4. **DatePicker** — depends on Popover (Layer 2) + Calendar helper logic
5. **FileUpload** — depends only on Text (Layer 1) + Upload/X icons

## Verification Pipeline

After each component:
```bash
npm run build-storybook  # exit 0
npm run typecheck        # zero component errors
grep -r '#[0-9a-fA-F]{6}' components/ui --include='*.tsx'  # zero hardcoded colors
```

Update the DESIGN-SYSTEM-CHECKLIST.md with completion date.

## Key Differences from Layer 1

- Layer 1 primitives are atomic (Button, Input, Checkbox)
- Layer 2 Forms components are **composite** (FormField wraps Input + Label + HelperText)
- Layer 2 components often manage their own state (SearchInput.value, FileUpload.files, DatePicker.open)
- Layer 2 stories are more complex (show various validation states, filled values, error cases)

## State Management Philosophy

- **FormField:** value/onChange props passed to Input; error state is read-only prop
- **FormGroup:** no state; just wraps children with fieldset/legend semantics
- **SearchInput:** value state can be controlled (props) or uncontrolled (use ref)
- **DatePicker:** open/close state internal; value/onChange are props
- **FileUpload:** files state internal; onFilesChange callback for parent sync

Keep state as close to the component as possible. Only lift state if a parent needs to coordinate multiple fields (form submission, validation, etc.).
