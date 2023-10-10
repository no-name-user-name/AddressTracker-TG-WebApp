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

        const setTextColor = (color) => {
            tg.MainButton.setParams({text_color: color})
        }
        const setColor = (color) => {
            tg.MainButton.setParams({color: color})
        }

        const showProgress = (leaveActive) => {
            tg.MainButton.showProgress(leaveActive)
        }

        const hideProgress = () => {
            tg.MainButton.hideProgress()
        }

        

        return{
            showProgress,hideProgress,
            currentText, isVisible, isActive,
            setText, onClick, offClick, 
            show, hide, enable, disable,
            setTextColor, setColor
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

        const setItem = (key, value, callback) => {
            tg.CloudStorage.setItem(key, value, callback)
        }
        const getItem = (key, callback) => {
            tg.CloudStorage.getItem(key, callback)
        }
        const getItems = (keys, callback) => {
            tg.CloudStorage.getItems(keys, callback)
        }
        const removeItem = (key, callback) => {
            tg.CloudStorage.removeItem(key, callback)
        }
        const removeItems = (keys) => {
            tg.CloudStorage.removeItems(keys)
        }
        const getKeys = (callback) => {
            tg.CloudStorage.getKeys(callback)
        }

        return {
            setItem, getItem, getItems, removeItem, removeItems, getKeys
        }
    }

    const HapticFeedback = () =>{

        // style: light medium heavy rigid soft
        const impactOccurred = (style) => {
            tg.HapticFeedback.impactOccurred(style)
        }
        // type: error success warning
        const notificationOccurred = (type) => {
            tg.HapticFeedback.notificationOccurred(type)
        }
        // type: error success warning
        const selectionChanged = () => {
            tg.HapticFeedback.selectionChanged()
        }
        
        return {
            impactOccurred, notificationOccurred, selectionChanged
        }
    }


    return {
        HapticFeedback,
        CloudStorage,
        setThemeClass,
        sendData, close, BackButton,
        MainButton, 
        enableClosingConfirmation, disableClosingConfirmation,
        user: tg.initDataUnsafe?.user, isClosingConfirmationEnabled, tg, initData
    };
}