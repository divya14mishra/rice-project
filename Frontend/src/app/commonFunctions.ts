declare var $: any;

export function showNotification(message: String, num: number) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    $.notify({
      icon: "pe-7s-gift",
      message: message
    }, {
      type: type[num],
      timer: 1000,
      placement: {
        from: 'bottom',
        align: 'right'
      }
    });
  }