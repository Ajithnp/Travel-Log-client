import GoogleAuth from "../GoogleAuth";

interface Props {
  showSocial?: boolean;
}

const AuthFooter = ({ showSocial }: Props) => {
  return (
    <>
      {showSocial && (
        <>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t after:border-border">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-1 justify-items-center">
            <GoogleAuth />
          </div>
        </>
      )}
      <div className="text-muted-foreground text-center text-xs mt-4 *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </>
  );
};

export default AuthFooter;
