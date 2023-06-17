export default function SiderbarLink({ text, Icon }) {
  return (
    <li className="flex items-center justify-center xl:justify-start space-x-3 text-lg mb-3 linkHoverAnimation">
      <Icon className="w-7" />
      <span className="hidden xl:inline">{text}</span>
    </li>
  );
}
