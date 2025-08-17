import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { EmailValidationStatus } from '@/hooks/useEmailValidation';

interface EmailInputProps extends React.ComponentProps<"input"> {
  validationStatus: EmailValidationStatus;
  validationMessage?: string;
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ className, validationStatus, validationMessage, ...props }, ref) => {
    const getValidationIcon = () => {
      switch (validationStatus) {
        case 'validating':
          return <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />;
        case 'valid':
          return <CheckCircle2 className="w-4 h-4 text-green-600" />;
        case 'invalid':
          return <XCircle className="w-4 h-4 text-destructive" />;
        default:
          return null;
      }
    };

    const getInputClassName = () => {
      switch (validationStatus) {
        case 'valid':
          return 'border-green-500 focus-visible:ring-green-500';
        case 'invalid':
          return 'border-destructive focus-visible:ring-destructive';
        case 'validating':
          return 'border-primary focus-visible:ring-primary';
        default:
          return '';
      }
    };

    return (
      <div className="space-y-1">
        <div className="relative">
          <Input
            ref={ref}
            type="email"
            className={cn(
              'pr-10 transition-colors',
              getInputClassName(),
              className
            )}
            {...props}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {getValidationIcon()}
          </div>
        </div>
        {validationMessage && validationStatus === 'invalid' && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            {validationMessage}
          </p>
        )}
        {validationStatus === 'validating' && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            Checking email availability...
          </p>
        )}
        {validationStatus === 'valid' && (
          <p className="text-xs text-green-600 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Email looks good!
          </p>
        )}
      </div>
    );
  }
);

EmailInput.displayName = "EmailInput";

export { EmailInput };