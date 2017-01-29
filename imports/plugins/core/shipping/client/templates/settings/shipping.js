import { Template } from "meteor/templating";
/*
 * Template shippinges Helpers
 */
Template.shippingSettings.onCreated(function () {
  this.autorun(() => {
    this.subscribe("Shipping");
  });
});

Template.shippingSettings.helpers({
  checked(enabled) {
    if (enabled === true) {
      return "checked";
    }
    return "";
  },
  shown(enabled) {
    if (enabled !== true) {
      return "hidden";
    }
    return "";
  }
});

Template.shippingSettings.events({
  /**
   * shippingSettings settings update enabled status for shipping service on change
   * @param  {event} event    jQuery Event
   * @return {void}
   */
  "change input.checkbox-switch.shipping-settings[name=enabled]": (event) => {
    event.preventDefault();
    const settingsKey = event.target.getAttribute("data-key");
    const packageId = event.target.getAttribute("data-id");
    const fields = [{
      property: "enabled",
      value: event.target.checked
    }];
    // save shipping registry updates
    if (packageId) {
      // TODO also disable providers
      Meteor.call("registry/update", packageId, settingsKey, fields);
    }
  }
});