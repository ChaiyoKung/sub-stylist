const isOnStorageKey: string = 'isOn';

interface Style {
  textColor: string;
  backgroundColor: string;
}

const styleStorageKey: string = 'style';

const defaultStyle: Style = {
  textColor: 'rgba(255, 255, 255, 1)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

function applyStyle(style: Style) {
  const css = `
    .player-timedtext > .player-timedtext-text-container > span > span {
      color: ${style.textColor} !important;
      background-color: ${style.backgroundColor} !important;
    }
  `;

  const currentStyleTag = document.querySelector('style#sub-stylist-style') as HTMLStyleElement | null;
  if (currentStyleTag) {
    currentStyleTag.textContent = css;
    return;
  }

  const styleTag = document.createElement('style');
  styleTag.id = 'sub-stylist-style';
  styleTag.textContent = css;
  document.head.appendChild(styleTag);
}

function removeStyle() {
  const currentStyleTag = document.querySelector('style#sub-stylist-style') as HTMLStyleElement | null;
  if (currentStyleTag) {
    currentStyleTag.remove();
  }
}

async function loadAndApplyStyle() {
  const states = await chrome.storage.sync.get([isOnStorageKey, styleStorageKey]);
  const isOn = states[isOnStorageKey] as boolean | undefined;
  if (!isOn) {
    return;
  }

  const style = states[styleStorageKey] as Style | undefined;
  if (style !== undefined) {
    applyStyle(style);
  } else {
    applyStyle(defaultStyle);
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'changeStyle') {
    const isOn = message.payload.isOn as boolean;
    if (isOn) {
      const style = message.payload.style as Style;
      applyStyle(style);
    } else {
      removeStyle();
    }
  }
});

loadAndApplyStyle();
