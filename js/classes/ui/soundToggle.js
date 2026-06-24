class SoundToggle {
  constructor(x, y, scene) {
    const green = 0x56a135;
    const red = 0xaa4444;
   
    this.rect = scene.add.rectangle(x + 60, y + 15, 130, 44, muteAll ? red : green).setRounded();
    this.text = scene.add
      .text(x + 60, y + 15, muteAll ? "SOUND: OFF" : "SOUND: ON", {
        fontFamily: "Consolas",
        fontSize: "16px",
        fill: "#fff",
      })
      .setOrigin(0.5);

    this.rect.setInteractive().on("pointerdown", () => {
      muteAll = !muteAll;
      game.sound.mute = muteAll;
      this.rect.setFillStyle(muteAll ? red : green);
      this.text.setText(muteAll ? "SOUND: OFF" : "SOUND: ON");
      localStorage.setItem('muteAll', muteAll);
      scene.sounds["click"].play();
    });
  }
}
