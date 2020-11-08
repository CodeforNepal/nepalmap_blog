import Link from "next/link"
import BreadcrumbsSeperator from "./breadcrumbs-seperator"

interface BreadcrumbItem {
    title: string;
    url: string;
}
interface BreadcrumbProps {
    items: BreadcrumbItem[]
}
export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="text-sajilo font-bold mb-8" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
                {items.map((item,itemIndex) => {
                    return (
                        <li key={itemIndex} className="flex items-center">
                            <Link href={item.url}><a className={`${itemIndex === items.length -1 ? 'text-gray-500' :''}`}>{item.title}</a></Link>
                            {itemIndex !== items.length - 1 && <BreadcrumbsSeperator />}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumb;