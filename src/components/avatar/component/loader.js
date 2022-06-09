import { CircleLoader } from "react-awesome-loaders";
export const CircleLoaderComponent = () => {
  return (
    <>
      <CircleLoader
        meshColor={"green"}
        lightColor={"#E0E7FF"}
        duration={1.5}
        desktopSize={"90px"}
        mobileSize={"64px"}
      />
    </>
  );
}