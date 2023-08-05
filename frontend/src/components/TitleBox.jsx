export default function TitleBox({ title, variant }) {
  const divStyle = {
    backgroundColor: ((variant === 'primary') && '#cfe2ff') || ((variant === 'success') && '#28a745') || '#e2e3e5',
    borderColor: ((variant === 'primary') && '#0056b3') || ((variant === 'success') && '#1d7044') || '#939699',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '5px',
    width: '100%',
    color: ((variant === 'primary') && '#052c65') || ((variant === 'success') && '#0a3622') || '#2b2f32',
  };

  return (
    <div className="mt-1 mb-3 p-2 text-center" style={divStyle}>
      <h4 className="pt-1">{title}</h4>
    </div>
  );
}
