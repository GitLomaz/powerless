class SoundToggle {
  constructor(x, y, scene) {
    const green = 0x56a135;
    const red = 0xaa4444;
   
    this.rect = scene.add.rectangle(x + 60, y + 15, 130, 44,green).setRounded();
    this.text = scene.add
      .text(x + 60, y + 15, "SOUND: ON", {
        fontFamily: "Consolas",
        fontSize: "16px",
        fill: "#fff",
      })
      .setOrigin(0.5);

    let on = soundStatus;

    this.rect.setInteractive().on("pointerdown", () => {
      on = !on;
      this.rect.setFillStyle(on ? green : red);
      this.text.setText("SOUND: " + (on ? "ON" : "OFF"));
      soundStatus = on;
    });
  }
}
