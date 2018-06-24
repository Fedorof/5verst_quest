import {MDQuest} from "../framework/quest";
import dedent from 'dedent';

export class Yard extends MDQuest {
    startLoc = 'двір';

    двір = () => `
        Крайній двір села.
        
        
        У хаті тихо, господарі з дітьми сплять.
        ${
        [
            "Чутно, як у хліву щось виє-завиває",
            "Чутно, як у хліву виє домовик",
            "Із хліва лунає сміх домовика",
            "Із хліва лунає сміх домовика"
        ][this.gget('статус_домовик')]
        }, час од часу фиркає кінь.
        
        ${
        this.get("двір_був")
        ? dedent`
            За селом дзюркотить річка, доріжка прямує уздовж 
            берега та губиться в лісі.                
            `
        : dedent`
            ${ this.set("двір_був", true) }
            За селом дзюркотить річка, місячне сяйво виблискує в її водах. 
            Доріжка прямує уздовж річки та губиться ген у лісі, чути як 
            шурхотить листя та вітер шумить у кронах.
            
            Доріжка має привести на Січ. Та от місяць у повні, значить
            усіляка нечисть вилазить на світ Божий, краще уночі 
            бездумно не ходити.
            `
        }
        
        [Йти доріжкою](#road:доріжка${ this.gget('статус_нявка', 0) })
                
        [Зайти у хлів](#хлів${ this.gget('статус_домовик', 0) })

    `;



    хлів0 = () => `
        ${ this.gset("статус_домовик", 1) }
        
        Коло стіни спить корова, трохи далі стоять ясла, 
        кінь уткнувся в них мордою.
        
        Парубок заходить у хлів, кінь ліниво обертається на звук його кроків,
        корова підводиться на ноги.
        
        На яслах стоїть маленький дідок — із вершок на зріст, не більше,
        сива борода стелеться землею, рука тримає гребінець. Дідок 
        ніжно погладжує шию коня, гребінець 
        раз у раз снує пишною кінською гривою.
        
        Так ось хто виє у хліву! Домовик скотину доглядає,
        та тужить-побивається.
        
        [Говорити з домовиком](#хлів_говорити)
        
        [Вийти](#двір)
    `;



    хлів = () => `
        Корова притулилася до стіни, кінь поволі жує овес із ясел,
        ${ this.carousel("хлів", [
        "домовик же йому гриву розчісує.",
        "домовик старанно розчісує кінський хвіст.",
        "домовик підкладає йому трави, та й промовляє: ''Їж, їж, рідненький.''",
        "домовик узяв відро та доливає воду в поїлку.",
        "домовик узявся за вила та підгрібає солому.",
        "домовик зібрав кінський волос — сидить, помазки в’яже.",
        "домовик стукає, шарудить. Хоч самого не видко, але чути, що працює.",
        "домовик узяв жорстку щітку та чеше корові боки.",
        "домовик узяв мішковину та натирає корові роги."
    ])}
        
        ${ this["хлів_кнопки"]() }
    `;


    хлів_кнопки = () => `
        ${
        (this.gget("статус_нявка") === 3)
            ? "[Спитати про дівчат](#домовик_дівчата)"
            : ""
        }
        ${
        (this.gget("загадка") && !this.get("count_домовик_загадка"))
            ? "[Спитати про загадку](#домовик_загадка)"
            : ""
        }
        ${
        (this.gget("статус_нявка") === 1
            && this.get("count_хлів_говорити") && !this.get("count_домовик_нявка"))
            ? "[Спитати про нявку](#домовик_нявка)"
            : ""
        }
    `;



    домовик_нявка = () => `
        — Дідусю домовику, — говорить парубок, — навчи, как нявку обійти.
    
        А домовик промовляє:
    
        — Одна нявка — не завада. Гірше, коли їх багато. Як звички їх знаєш,
         однієї можеш не страшитися, та як не знаєш — заволоче тебе нявка!
        
        ${
        (this.gget("статус_домовик") < 2)
            ? dedent`
                — Допоміг би ти мені, — додає, — може й навчишся чому-небудь.
                Та й силу свою перевіриш: чи до снаги тобі з нявкою тягатися?
            `
            : dedent`
                — Але ти, — додає, — жабу-коровницю поборов, а нявку 
                тим паче подужаєш!
            `
        }
    
        [Далі](#хлів${ this.gget("статус_домовик", 0) })
    `;



    домовик_дівчата = () => `
        ${ this.gset("статус_нявка", 4) }
        — Дідусю домовику! — говорить джура. — Чи не знаєш, що за дівчата
        сидять на бережку? І одягнені, і коси заплетені...
    
        — Так то ж берегині! — промовляє домовик. — Де опир не царює,
        там берегині господарюють. Чесним людям іх не варто боятися: вони й
        допоможуть, і від лиха врятують.
    
        [Далі](#хлів${ this.gget("статус_домовик", 0) })
    `;



    домовик_загадка = () => `
        ${ (this.gget("статус_нявка") < 4)? this.gset("статус_нявка", 4) : "" }
    
        — Дідусю домовику! — говорить джура. — Чи не знаєш ти відкадки 
        на загадку:

        ${ this["_question"]() }
    
        — Хто ж тобі таку загадку загадав? — питається домовик.
    
        — Водяник, — говорить джура, — каже — як не вгадаю, через 
        брід не пустить.
    
        — То мене не питай, — промовляє домовик. — Там, коло річки,
        берегині сидять — у них і проси допомоги. Чесних людей
        вони завжди виручають.
    
        [Далі](#хлів${ this.gget('статус_домовик', 0) })
    `;



    хлів1 = () => `
        ${ this["хлів"]() }
    
        ${
            this.get("count_хлів_говорити", false)
            ? "[Запропонувати допомогу](#хлів_погодитись)"
            : "[Говорити з домовиком](#хлів_говорити)"
        }
    
        [Вийти](#двір)
    `;

    

    хлів2 = () => `
        ${ this["хлів"]() }
    
        ${ this["хлів_кнопки"]() }
    
        [Вийти](#двір)
    `;
    
    
/*
    хлів2 = () => `
        Домовик сидить на лаві, в руках у нього переметна сумка. На
        сумці красуються небачені звірі та химерні візерунки. Домовик натирає
        ганчіркою золотистий замочок.
    
        [Спитати про сумку](#сумка)
        ${ this["хлів_кнопки"]() }
        [Вийти](#двір)
    `;
*/



    сумка = () => `
        ${ this.gset("статус_домовик", 3) }
        — А что это за сумка такая? — спрашивает джура.
    
        — Тут один летописец приехал из греков, — говорит домовик, — все
        басни рассказывал о химерах всяких и гигантах. Тут замок хитрый
        на сумке, а летописец забыл, как его открыть. Говорил, ключ от
        сумки такой же, как от истории, в которой фараонова крыса
        убила гиганта.
    
        домовик кладёт сумку на скамью и возвращается к хозяйству.
    
        [Далі](#хлів3)
    `;


    сумка_відкрита = () => `
        ${ this.set("відкрив_сумку", 1) }
        
        
        [Повернути сумку на місце](#хлів${ this.gget("статус_домовик", 0) })
    `;



    хлів3 = () => `
        ${ this["хлів"]() }
        На лаві лежить переметна сумка з чудернацьким замком.
        
        ${
        (this.get("відкрив_сумку") !== 0)
            ? "[Відкрити сумку](#сумка_відкрита)"
            : "[Відкрити сумку](#сумка_замок)"
        } 
        
        [Вийти](#двір)
    `;



    хлів_говорити = () => `
        — Доброї ночі, дідусю, — говорить парубок. — За чим журишся?
        
        — Та от, — промовляє домовик, — пусти біду в двір, 
        то з двору не виженеш. Жаба-корівниця сьогодні прискаче, 
        буде коров’яче молоко пити, зовсім німину бідолашну загубить.
        А без корови господар із господарочкою бідувати будуть...
        Як тут зарадиш? Ось ти — ти ж козацкого роду, із характерників?
        Допоможи господарство уберегти, будь ласкавий!
        
        [Відмовитись](#хлів_відмовитись)
        
        [Погодитись](#хлів_погодитись)
    `;



    хлів_відмовитись = () => `
        — Допоміг би я, дідусю, — промовляє парубок, — Та ніколи. 
        Звісточку отримав недобру, на Січ поспішаю.
        
        — Ех, хлопче! — говорить домовик. — Хіба не знаєш, що люди кажуть?
        Хто довго запрягає, той швидко їде.
        
        [Далі](#хлів${ this.gget("статус_домовик", 0) })
    `;



    хлів_погодитись = () => `
        ${ this.gset("статус_домовик", 2) }
        — Гаразд, — промовляє парубок, — допоможу тобі, хазяїн.
        Кажи, що робити?
        
        Домовик як почув, до парубка підскочив, у долоні плескає, сміється -
        як дитя мале.
        
        — Піди, — каже, — під стріхою веретено візьми — я ще вдень запримітив,
        як його господарочка туди засунула. Потім приходь, сховайся за ясла.
        Та не барись, жаба ось-ось об’явиться!
        
        
        Зробив джура усе, що домовик порадив — узяв веретено, присів за яслями,
        чекає...
        
        [Далі](#хлів_жаба)
    `;



    хлів_жаба = () => `
        Не встиг сховатися, чує — гупає щось за тином, на перелаз
        навалилось — чорне, велике. Аж тин затріщав. Бух — увалилось у
        двір. Дивиться парубок — а то здоровенна ропуха, очищі як блюдця,
        так і зиркають із боку в бік, сама ж як теля завбільшки.
        
        Глянула ропуха вліво, вправо, а парубок сидить, 
        не ворушиться — як із такою громадиною битися, та ще й веретеном?
        Хоч і чув від наставника, що веретено щодня у роботі,
        трудом та руками людскими освячене, та не віриться, що ропуха перед
        ним відступить.
        
        [Далі](#хлів_жаба0)
    `;



    хлів_жаба0 = () => `
        А ропуха просто до хліва стрибає — знає, вражина, де бідну корівку
        тримають. Парубок чекає, уже в ніс болотним смородом вдарило,
        уже ропуха так близько, от-от сама джуру запримітить...
        
        Підхоплюється парубок, та як ударить ропуху!
        Та перекинулась - і на подвір’я відлетіла. Виходить джура,
        дивиться — немає ропухи, посеред двору стара баба лежить, 
        дух випускає. Зметикував, що не ропуху — бісицю в личині ропухи
        веретеном стукнув.
        
        — Ох, — говорит стара, — вдар іще!
        
        [Далі](#хлів_жаба1)
    `;



    хлів_жаба1 = () => `
        Тут старый козак переривається.
        
        — Що думаєте, громадо? Чи варто джурі добити нечисту, чи так лишити?
        
        [Добити](#жаба_добити)
        
        [Залишити](#жаба_лишити)
    `;



    жаба_лишити = () => `
        — Залишити, — говорять слухачі, — хай сама доходить.
        
        — Звісно, що лишити! — промовляє козак. — З чого б їй просити другого
        удару? Парубок одразу второпав: як вдарить ще, то йому, а не бісиці,
        кінець прийде.
        
        [Далі](#жаба_лишити1)
    `;


    жаба_добити = () => `
        — Добити, — загуділи слухачі, — добити вражину!
        
        — Отож бо й джура так вирішив, — промовляє дід. — Нема щоб подумати: 
        чого б це бісиця сама просила, щоб джура її вдарив? А тому, що другий
        удар відміняє перший. Вдарив її парубок удруге, бісиця на нього 
        й накинулась. Уранці навіть кісточок не знайшли...
        
        Старий перевертає люльку, сивий попіл падає під ноги. Козак
        розправляє плечі, старі суглоби тріщать, немов сухі гілки.
        
        — Стривайте, — промовляє один парубок, — невже так все й було?
        
        — Може й так, може й інак, — говорить дід. — А вам -
        наука: до булави — треба голови.
        
        [Далі](#жаба_добити1)
    `;


    жаба_добити1 = () => `
        Парубки переглядаються між собою, дівчата опускають очі. 
        А старий на них дивиться, погляд лукавий, лице всміхнене.
        
        — А, що, — промовляє, — закоротка вийшла байка? То, може, правду
        говорять: і людей питай, і свою голову май? Бо, як біда, не чужу, а
        свою голову складеш.
        
        Слухачі підводять погляди, а козак ще ширше всміхається.
        
        — Гаразд, — говорить він, — ще трохи вам про джуру оповім. Слухайте,
        як далі було... 
        
        [Далі](#жаба_лишити1)
    `;


    жаба_лишити1 = () => `
        Не стал джура старуху добивать, она и сгинула.
        
        Подскочил тут домовик, в руки плещет, пританцовывает.
        
        — Ну, удружил! — говорит. — Спасибо, казаче! А то ишь, нечистые
        распоясались! Пока старый опырь был жив, на деревне тишь да гладь
        была, а как помер, начал козни строить — всяка нечисть средь бела дня
        во двір лезет, лесная так прям в окна заглядывает. А новый опырь только
        явился, не может он старого приструнить.
        
        [Далі](#жаба_лишити2)
    `;



    жаба_лишити2 = () => `
        — Так что ступай осторожно, — продолжает домовик. — Вдоль речки не иди -
        у берега на лесной поляне нявки гуляют, хороводы водят. Попадёшь к ним
        в лапы — косточек не сосчитаешь. За поляной брод есть, но ты не прямо к нему
        ступай, а через лес — так-то поспокойнее.
        
        Поклонился джура домовому.
        — Спасибо тебе, дедушка.
        
        — Да что там, тебе спасибо!
        
        Засмеялся домовик и к хозяйству своему вернулся — идёт, песни насвистывает.
        А домовые-то любят свистеть! Не зря старые люди говорят: не свисти в доме -
        домовик решит, что передразниваешь, и обидится.
        
        [Далі](#двір)
    `;
}
