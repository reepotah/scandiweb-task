import React, { Component } from "react";
import "./MiniAttributeSelector.css";

export default class MiniAttributeSelector extends Component {
  checkIfActive(attribute, id) {
    let selected = this.props.selected;
    if (selected[attribute.type + ":" + attribute.id])
      if (selected[attribute.type + ":" + attribute.id] === id) return " isActive";
    return "";
  }

  renderAttributeSelectors(attributes) {
    let content = attributes.map((attribute, index) => {
      switch (attribute.type) {
        case "text":
          return (
            <React.Fragment key={index}>
              <div className="miniAttributeLabel">{attribute.name}:</div>
              <div className="miniTextAttributeContainer">
                {attribute.items.map((item, index2) => {
                  return (
                    <div
                      key={index2}
                      className={"miniTextAttributeButton" + this.checkIfActive(attribute, item.id)}
                      onClick={() => {
                        this.props.onClick(attribute, item.id);
                      }}
                    >
                      {item.displayValue}
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          );
        case "swatch":
          return (
            <React.Fragment key={index}>
              <div className="miniAttributeLabel">{attribute.name}:</div>
              <div className="miniSwatchAttributeContainer">
                {attribute.items.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: item.value,
                      }}
                      className={
                        "miniSwatchAttributeButton" + this.checkIfActive(attribute, item.id)
                      }
                      onClick={() => {
                        this.props.onClick(attribute, item.id);
                      }}
                    ></div>
                  );
                })}
              </div>
            </React.Fragment>
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
