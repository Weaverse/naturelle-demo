import {Button, type ButtonProps} from '@/components/button';
import type {HydrogenComponentSchema} from '@weaverse/hydrogen';
import {IconEllipse} from '~/components/Icon';
import {CSSProperties, forwardRef} from 'react';

interface OriginalButtonProps extends ButtonProps {
  href?: string;
  target?: string;
  textColorDecor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  backgroundColorHover?: string;
  textColorHover?: string;
  borderColorHover?: string;
}

const WeaverseButton = forwardRef<HTMLButtonElement, OriginalButtonProps>(
  (props, ref) => {
    const {href, target, value, variant, shape, fontFamily, textColorDecor, textColor, backgroundColor, borderColor, backgroundColorHover, textColorHover, borderColorHover, ...rest} = props;
    const Component = href ? 'a' : 'button';
    let style = {
      color: textColorDecor,
      '--text-color': textColor,
      '--background-color': backgroundColor,
      '--border-color': borderColor,
      '--background-color-hover': backgroundColorHover,
      '--text-color-hover': textColorHover,
      '--border-color-hover': borderColorHover,
    } as CSSProperties;
    let styleButton = ""
    if (variant === 'custom') {
      styleButton = "bg-[var(--background-color)] border border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--background-color-hover)] hover:text-[var(--text-color-hover)] hover:border-[var(--border-color-hover)]"
    }
    return (
      <Button
        as={Component}
        to={href}
        target={target}
        variant={variant}
        shape={shape}
        fontFamily={fontFamily}
        ref={ref}
        {...rest}
        className={`w-fit ${props.className} ${variant === 'custom' && styleButton}`}
        style={style}
      >
        {variant === 'decor' ? (
          <>
            <IconEllipse
              className="absolute inset-0 !h-[61px] !w-[148px] transform transition-transform duration-500 hover:rotate-[-11deg]"
              stroke={textColorDecor ? textColorDecor : 'rgb(var(--color-foreground))'}
              viewBox="0 0 148 61"
            />
            <div className="flex pl-4 pt-2">{value}</div>
          </>
        ) : (
          <>{value}</>
        )}
      </Button>
    );
  },
);

export default WeaverseButton;

export const schema: HydrogenComponentSchema = {
  title: 'Button',
  type: 'button',
  inspector: [
    {
      group: 'Settings',
      inputs: [
        {
          type: 'text',
          name: 'value',
          label: 'Text',
          defaultValue: 'Shop now',
        },
        {
          type: 'url',
          name: 'href',
          label: 'Link to',
          defaultValue: '/products',
          placeholder: '/products',
        },
        {
          type: 'select',
          name: 'target',
          label: 'Target',
          defaultValue: '_self',
          configs: {
            options: [
              {label: 'Open the current page', value: '_self'},
              {label: 'Open a new page', value: '_blank'},
              {label: 'Open the parent page', value: '_parent'},
              {label: 'Open the first page', value: '_top'},
            ],
          },
        },
        {
          type: 'heading',
          label: 'Button style',
        },
        {
          type: 'select',
          name: 'variant',
          label: 'Variant',
          defaultValue: 'primary',
          configs: {
            options: [
              {label: 'Primary', value: 'primary'},
              {label: 'Outline', value: 'outline'},
              {label: 'Secondary', value: 'secondary'},
              {label: 'Decor', value: 'decor'},
              {label: 'Custom', value: 'custom'},
            ],
          },
        },
        {
          type: 'select',
          name: 'fontFamily',
          label: 'Font family',
          defaultValue: 'body',
          configs: {
            options: [
              {label: 'Font body', value: 'body'},
              {label: 'Font heading', value: 'heading'},
            ],
          },
          condition: "variant.eq.custom",
        },
        {
          type: 'select',
          name: 'size',
          label: 'Button Size',
          defaultValue: 'default',
          configs: {
            options: [
              {label: 'Default', value: 'default'},
              {label: 'Small', value: 'sm'},
              {label: 'Large', value: 'lg'},
              {label: 'Icon', value: 'icon'},
            ],
          },
          condition: `variant.ne.decor`,
        },
        {
          type: 'select',
          name: 'shape',
          label: 'Shape',
          defaultValue: 'round',
          configs: {
            options: [
              {label: 'Default', value: 'default'},
              {label: 'Round', value: 'round'},
            ],
          },
          condition: `variant.ne.decor`,
        },
        {
          type: 'color',
          label: 'Text color',
          name: 'textColorDecor',
          condition: "variant.eq.decor",
        },
        {
          type: "color",
          label: "Background color",
          name: "backgroundColor",
          condition: "variant.eq.custom",
        },
        {
          type: "color",
          label: "Text color",
          name: "textColor",
          condition: "variant.eq.custom",
        },
        {
          type: "color",
          label: "Border color",
          name: "borderColor",
          condition: "variant.eq.custom",
        },
        {
          type: "color",
          label: "Background color (hover)",
          name: "backgroundColorHover",
          condition: "variant.eq.custom",
        },
        {
          type: "color",
          label: "Text color (hover)",
          name: "textColorHover",
          condition: "variant.eq.custom",
        },
        {
          type: "color",
          label: "Border color (hover)",
          name: "borderColorHover",
          condition: "variant.eq.custom",
        },
      ],
    },
  ],
};