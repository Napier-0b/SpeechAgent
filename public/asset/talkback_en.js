let talkbackEnabled = false;
function talkback() {
	// 利用するWebAPIをインスタンス化する
	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	const recog = new SpeechRecognition();
	const synth = new SpeechSynthesisUtterance();
	// 設定項目
	const pitchSetting = 1.0;  // ピッチ 0(min) - 2(max), default 1.0
	const volumeSetting = 1.0; // 音量 0(min) - 1(max), default 1.0
	const rateSetting = 1.0; // 話す速さ 0.1(min) - 10(max), default 1.0
	// 設定項目終わり
	const defaultInput = "";
	let input = defaultInput;
	recog.lang = "en-US";
	synth.lang = "en-US";
	synth.pitch = pitchSetting;
	synth.volume = volumeSetting;
	synth.rate = rateSetting;
	// 聞き取り中に、マイクからの入力があったときのイベント
	recog.addEventListener("result", e => {
		// 入力結果をテキストで取得し、それをグローバル変数に格納し、聞き取りを終了する
		input = e.results[0][0].transcript;
		recog.stop();
	});
	// 聞き取りを終了したときのイベント
	recog.addEventListener("end", () => {
		// 入力結果が初期状態の場合は聞き取りが自動終了したと判断し、聞き取りを再開する
		if (input === defaultInput) {
			recog.start();
		}
		// 入力結果に値があればそれを読み上げ、入力結果を初期化する
		else {
			synth.text = input;
			document.querySelector("#recognizedText").textContent = input;
			input = defaultInput;
			speechSynthesis.speak(synth);
		}
	});
	// 読み上げを終了したときのイベント
	synth.addEventListener("end", () => {
		// 聞き取りを再開する
		recog.start();
	});
	// 聞き取りを開始する
	recog.start();
}
function initSpeak() {
	document.getElementById("activation").disabled = true;
	document.getElementById("activation").className = "btn-success";
	document.getElementById("activation").innerHTML = "Auto-talkback enabled";

	let initSynth = new SpeechSynthesisUtterance("Auto-talkback enabled");
	initSynth.lang = "en-US";
	speechSynthesis.speak(initSynth);
	if (!talkbackEnabled) {
		talkback();
	}
	talkbackEnabled = true;
}
