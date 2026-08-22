// 「发送验证码」按钮的 60 秒倒计时(Svelte 5 rune 工厂;组件卸载 destroy 清理)。
export function createCooldown(seconds = 60) {
  let remaining = $state(0);
  let timer: ReturnType<typeof setInterval> | null = null;

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    remaining = 0;
  }

  return {
    get remaining() {
      return remaining;
    },
    get active() {
      return remaining > 0;
    },
    start() {
      stop();
      remaining = seconds;
      timer = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) stop();
      }, 1000);
    },
    destroy: stop,
  };
}
