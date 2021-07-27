/**
 * Item entity Component.
 */
class Item {
  /**
   * Creates Item entity Component component.
   */
  constructor() {
    /**
     * The item dictionary.
     * @private {!Object}
    */
    this.itemDict_ = {};
  }

  /**
   * Sets item data.
   * @param {!Object} newData The new item data.
   */
  set data(newData) {
    if (!newData) {
      return;
    }

    this.itemDict_ = {...this.itemDict_, ...newData};
  }

  /**
   * Gets item data.
   * @return {!Object}
   */
  get data() {
    return this.itemDict_;
  }

  /**
   * Sets item description.
   * @param {!Object} itemCategory The item category.
   */
  set description(itemDescription) {
    this.itemDict_ = {
      ...this.itemDict_,
      description: itemDescription.plain_text || ''
    }
  }

  /**
   * Gets item description.
   * @return {string}
   */
  get description() {
    return this.itemDict_.description;
  }

  /**
   * Sets the item currency.
   * @param {!Object} itemCurrency The item currency data.
   */
  set currency(itemCurrency) {
    this.itemDict_ = {
      ...this.itemDict_,
      currency: itemCurrency
    }
  }

  /**
   * Gets the item currency.
   * @return {Object}
   */
  get currency() {
    return this.itemDict_.currency
  }
}

module.exports = Item;
