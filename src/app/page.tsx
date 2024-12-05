import Link from "next/link";

export default function Home() {
  const sections = [
    { name: '子猫', path: '/dashboard/kittens' },
    { name: '親猫', path: '/dashboard/parent' },
    { name: '里親募集', path: '/dashboard/adoption' },
    { name: 'お知らせ', path: '/dashboard/news' },
    { name: '猫種', path: '/dashboard/breeds' },
    { name: 'カラー', path: '/dashboard/colors' },
  ];

  return (
    <>
      <div>
        <h1>猫管理ダッシュボード</h1>
        <ul>
          {sections.map((section) => (
            <li key={section.name}>
              <Link href={section.path}>{section.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}