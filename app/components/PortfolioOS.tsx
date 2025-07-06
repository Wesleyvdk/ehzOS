import React, { useEffect } from 'react';
import { OSProvider, useOS } from '../context/OSContext';
import Desktop from './Desktop';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Widgets from './Widgets';
import Copilot from './Copilot';
import Windows from './Windows';

function PortfolioOSContent() {
    const { state, toggleWidgets, toggleCopilot, toggleStartMenu } = useOS();

    return (
        <div className="portfolio-os">
            <Desktop />
            <Windows />
            <Taskbar />
            <StartMenu
                isVisible={state.startMenuOpen}
                onClose={toggleStartMenu}
            />
            <Widgets
                isVisible={state.widgetsOpen}
                onClose={toggleWidgets}
            />
            <Copilot
                isVisible={state.copilotOpen}
                onClose={toggleCopilot}
            />
        </div>
    );
}

export default function PortfolioOS() {
    useEffect(() => {
        // Apply Win12 theme variables to document root
        document.documentElement.className = 'win12-theme';

        // Apply Win12 typography
        document.body.style.fontFamily = 'Segoe UI, system-ui, sans-serif';
        document.body.style.fontSize = '15.5px';

        return () => {
            document.documentElement.className = '';
            document.body.style.fontFamily = '';
            document.body.style.fontSize = '';
        };
    }, []);

    return (
        <OSProvider>
            <PortfolioOSContent />
        </OSProvider>
    );
} 