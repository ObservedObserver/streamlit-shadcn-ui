import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp";
  import { forwardRef, useState, useEffect } from "react";
  import { Streamlit } from "streamlit-component-lib";
  
  interface StInputOTPProps {
    defaultValue?: string;
    maxLength?: number;
    className?: string;
  }
  
  export const StInputOTP = forwardRef<HTMLInputElement, StInputOTPProps>(
    (props: StInputOTPProps, ref) => {
    const { defaultValue, maxLength, className, ..._props } = props;
      const [otp, setOtp] = useState<string>("");
      console.log("maxLength",maxLength)
      useEffect(() => {
        const initialValue = defaultValue.slice(0, maxLength);
        setOtp(initialValue);
      }, [defaultValue, maxLength]);
  
      const handleChange = (newValue: string) => {
        setOtp(newValue); 
        Streamlit.setComponentValue(newValue); 
      };
  
      return (
        <InputOTP
          value={otp}
          ref={ref}
          maxLength={maxLength}
          onChange={handleChange} 
          className={`${className}`}
          {..._props}
        >
          <InputOTPGroup>
            {Array.from({ length: Math.ceil(maxLength / 2) }).map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index} 
              />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            {Array.from({ length: Math.floor(maxLength / 2) }).map((_, index) => (
              <InputOTPSlot
                key={index + Math.ceil(maxLength / 2)}
                index={index + Math.ceil(maxLength / 2)}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      );
    }
  );
