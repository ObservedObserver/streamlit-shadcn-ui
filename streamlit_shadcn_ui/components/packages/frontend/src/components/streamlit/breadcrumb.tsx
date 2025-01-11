import { forwardRef } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface StBreadcrumbProps {
  items: {
    text: string;
    href?: string;
    isCurrentPage?: boolean;
  }[];
  separator?: React.ReactNode;
  className?: string;
}

export const StBreadcrumb = forwardRef<HTMLElement, StBreadcrumbProps>(
  (props: StBreadcrumbProps, ref) => {
    const { items, separator, className, ..._props } = props;
    return (
      <Breadcrumb className={className} ref={ref} {...props}>
        <BreadcrumbList>
          {items.map((item, index) => (
            <>
              <BreadcrumbItem key={`${item.text}-${index}`}>
                {item.isCurrentPage ? (
                  <BreadcrumbPage>{item.text}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href || "#"}>
                    {item.text}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && (
                <BreadcrumbSeparator key={`separator-${index}`}>
                  {separator}
                </BreadcrumbSeparator>
              )}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
);