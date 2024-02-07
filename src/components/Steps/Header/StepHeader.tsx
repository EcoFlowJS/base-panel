interface StepHeaderProps {
  HeaderText?: string;
  HeaderDescription?: string;
}

export default function StepHeader({
  HeaderText = "",
  HeaderDescription = "",
}: StepHeaderProps) {
  return (
    <div>
      <h5>{HeaderText}</h5>
      <small style={{ fontSize: "small" }}>{HeaderDescription}</small>
    </div>
  );
}
