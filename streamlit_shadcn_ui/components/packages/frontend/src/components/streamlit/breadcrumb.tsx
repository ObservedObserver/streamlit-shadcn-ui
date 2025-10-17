import React, { forwardRef, useCallback } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Streamlit } from "streamlit-component-lib";
import { nanoid } from 'nanoid';
import { StComponentValue } from "@/interfaces";

interface StBreadcrumbProps {
  items: {
    text: string;
    href?: string;
    isCurrentPage?: boolean;
  }[];
  separator?: React.ReactNode;
  className?: string;
}

type StBreadcrumbValue = StComponentValue<{ text: string; href?: string; index: number }, undefined>;

export const StBreadcrumb = forwardRef<HTMLElement, StBreadcrumbProps>(
  (props: StBreadcrumbProps, ref) => {
    const { items, separator, className, ..._props } = props;

    const handleClick = useCallback((item: { text: string; href?: string }, index: number) => {
      return (e: React.MouseEvent) => {
        e.preventDefault();
        Streamlit.setComponentValue({ 
          value: { text: item.text, href: item.href, index }, 
          event_id: nanoid() 
        } as StBreadcrumbValue);
      };
    }, []);

    return (
      <Breadcrumb className={className} ref={ref} {..._props}>
        <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={`${item.text}-${index}`}>
            <BreadcrumbItem>
              {item.isCurrentPage ? (
                <BreadcrumbPage>{item.text}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink 
                  href={item.href || "#"}
                  onClick={handleClick(item, index)}
                >
                  {item.text}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
);