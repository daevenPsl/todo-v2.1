import {
    Button,
    Header,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
  } from "@carbon/react";


export const NavBar= () => {
  return (
    <div className="App">
      <Header aria-label="IBM Platform Name">
        <HeaderName href="#" prefix="IBM">
          [Platform]
        </HeaderName>
        <HeaderNavigation aria-label="IBM [Platform]">
          <HeaderMenuItem href={"/"}>View Todo</HeaderMenuItem>
          {/* <HeaderMenuItem href={"/addtodo"}>Add Todo</HeaderMenuItem> */}
          {/* <HeaderMenuItem href={"/viewtodo"}>View Todo</HeaderMenuItem> */}
        </HeaderNavigation>
      </Header>
    </div>
  );
}

// export default Home;
