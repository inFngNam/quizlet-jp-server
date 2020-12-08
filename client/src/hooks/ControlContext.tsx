import React, { useState } from 'react';

export const ControlContext = React.createContext<any>(null);
const ControlProvider = ({children}: any) => {
  const [tabIndex, setTabIndex] = useState(3);
  const [showAddModule, setShowAddModule] = useState(false);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddClass, setShowAddClass] = useState(false);
  return (
    <ControlContext.Provider
      value={{
        tabIndex: tabIndex,
        setTabIndex: (i: number) => setTabIndex(i),

        showAddModule: showAddModule,
        setShowAddModule: () => setShowAddModule(true),
        hideAddModule: () => setShowAddModule(false),

        showAddFolder: showAddFolder,
        setShowAddFolder: () => setShowAddFolder(true),
        hideAddFolder: () => setShowAddFolder(false),
        
        showAddClass: showAddClass,
        setShowAddClass: () => setShowAddClass(true),
        hideAddClass: () => setShowAddClass(false),
      }}
    >
      {children}
    </ControlContext.Provider>
  )
}
export default ControlProvider;