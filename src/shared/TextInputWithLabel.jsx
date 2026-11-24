
function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
  type = 'text',
  required = false,
}) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type={type}
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
}

export default TextInputWithLabel;
