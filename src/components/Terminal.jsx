import React from 'react';

const Terminal = ({isTerminalOpen, terminalOutput, onSetTerminalOutput}) => {
    return (
        <div
        className={`transition-all duration-300 ${
          isTerminalOpen ? "h-[40%]" : "h-0"
        } w-full bg-black text-white  fixed left-[16rem] bottom-0 right-0
         border-t-[1px] border-gray-400 overflow-auto
        `}
      >
        <div className="p-2 text-sm">
          {/* Output */}
          
            <pre>{terminalOutput.output}</pre>
            <div>
              <pre className="text-red-500 ps-3">{terminalOutput.error}</pre>
            </div>
        </div>
      </div>
    );
}

export default Terminal;
