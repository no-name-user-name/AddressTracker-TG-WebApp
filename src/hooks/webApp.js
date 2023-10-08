export function useWebApp() {
    const tg = window.Telegram.WebApp
    const isClosingConfirmationEnabled = tg.isClosingConfirmationEnabled
    const initData = tg.initData
    function setThemeClass() {
        document.documentElement.className = tg.colorScheme;
    }

    const close = () => {
        tg.close()
    }

    const enableClosingConfirmation = () => {
        tg.enableClosingConfirmation()
    }

    const disableClosingConfirmation = () => {
        tg.disableClosingConfirmation()
    }

    const sendData = (data) => {
        
    }

    const MainButton = () => {
        const currentText = tg.MainButton.text
        const isVisible = tg.MainButton.isVisible
        const isActive = tg.MainButton.isActive

        const setText = (text) => {
            tg.MainButton.setText(text)
        }

        const onClick = (callback) => {
            tg.MainButton.onClick(callback)
        }

        const offClick = (callback) => {
            tg.MainButton.offClick(callback)
        }

        const show = () => {
            tg.MainButton.show()
        }

        const hide = () => {
            tg.MainButton.hide()
        }

        const enable = () => {
            tg.MainButton.enable()
        }

        const disable = () => {
            tg.MainButton.disable()
        }

        const setTextColour = (color) => {
            tg.MainButton.setParams({text_color: color})
        }
        const setColour = (color) => {
            tg.MainButton.setParams({color: color})
        }

        return{
            currentText, isVisible, isActive,
            setText, onClick, offClick, 
            show, hide, enable, disable,
            setTextColour, setColour
        }
    }

    const BackButton = () => {
        const isVisible = tg.BackButton.isVisible

        const onClick = (callback) => {
            tg.BackButton.onClick(callback)
        }

        const offClick = (callback) => {
            tg.BackButton.offClick(callback)
        }

        const show = () => {
            tg.BackButton.show()
        }

        const hide = () => {
            tg.BackButton.hide()
        }

        return {
            isVisible, onClick, offClick, show, hide
        }
    }

    const CloudStorage = () => {

        const setItem = (key, value) => {
            tg.setItem(key, value)
        }
        const getItem = (key) => {
            tg.getItem(key)
        }
        const getItems = (keys) => {
            tg.getItems(keys)
        }
        const removeItem = (key) => {
            tg.removeItem(key)
        }
        const removeItems = (keys) => {
            tg.removeItems(keys)
        }
        const getKeys = (callback) => {
            tg.getKeys(callback)
        }
        return {
            setItem, getItem, getItems, removeItem, removeItems, getKeys
        }
    }

    return {
        CloudStorage,
        setThemeClass,
        sendData, close, BackButton,
        MainButton, 
        enableClosingConfirmation, disableClosingConfirmation,
        user: tg.initDataUnsafe?.user, isClosingConfirmationEnabled, tg, initData
    };
}