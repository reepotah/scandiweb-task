import React, { Component } from "react";
import "./AttributeSelector.css";

export default class AttributeSelector extends Component {
  checkIfActive(attribute, id) {
    let selected = this.props.selected;
    if (
      selected[attribute.type + ":" + attribute.id] &&
      selected[attribute.type + ":" + attribute.id] === id
    )
      return " --active";
    else return "";
  }

  renderAttributeSelectors(attributes) {
    let miniTag = this.props.isMinified ? "--mini" : "";
    let content = attributes.map((attribute, index) => {
      switch (attribute.type) {
        case "text":
          return (
            <div key={index} className={"attribute-selector" + miniTag}>
              <div className={"attribute-selector__label" + miniTag}>{attribute.name}</div>
              <div className={"attribute-selector__text-container" + miniTag}>
                {attribute.items.map((item, index2) => {
                  return (
                    <div
                      key={index2}
                      className={
                        "attribute-selector__text-button" +
                        miniTag +
                        this.checkIfActive(attribute, item.id)
                      }
                      onClick={() => {
                        this.props.onClick(attribute, item.id);
                      }}
                    >
                      {item.displayValue}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        case "swatch":
          return (
            <div key={index} className={"attribute-selector" + miniTag}>
              <div className={"attribute-selector__label" + miniTag}>{attribute.name}</div>
              <div className={"attribute-selector__swatch-container" + miniTag}>
                {attribute.items.map((item, index2) => {
                  return (
                    <div
                      key={index2}
                      style={{
                        backgroundColor: item.value,
                      }}
                      className={
                        "attribute-selector__swatch-button" +
                        miniTag +
                        this.checkIfActive(attribute, item.id)
                      }
                      onClick={() => {
                        this.props.onClick(attribute, item.id);
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
          );

        default:
          return null;
      }
    });
    return content;
  }
  render() {
    return this.renderAttributeSelectors(this.props.attributes);
  }
}
